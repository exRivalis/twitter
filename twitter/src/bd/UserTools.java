package bd;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

import org.json.JSONObject;

import tools.ServicesTools;

public class UserTools {
	public UserTools() {
		
	}
	
	public static JSONObject addUser(String login, String mdp, String nom, String prenom) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//resultat de retour ok/ko
		JSONObject result = ServicesTools.serviceAccepted("OK", "ok");;
		
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection co = Database.getMySQLConnection();
		//ajouter une ligne a la bd
		//ajout guillemets
		login = "\"" + login + "\"";
		nom = "\"" + nom + "\"";
		prenom = "\"" + prenom + "\"";
		mdp = "\"" + mdp + "\"";
		
		String query = "INSERT INTO users VALUES(null, " + login +"," + mdp + "," + nom + "," + prenom + ");";
		Statement st = co.createStatement();
		try {
			st.executeUpdate(query);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			result = ServicesTools.serviceRefused("KO", "ko");
		}
		
		//close connections
		st.close();
		co.close();
		
		
		return result;
	}
	
	public static boolean userExists(String login) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection co = Database.getMySQLConnection();
		//recup la ligne avec contenant ce login si elle existe
		String query = "SELECT * FROM users WHERE login=\"" + login + "\"";
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		boolean succeed = true;
		//si ma requete ne renvoie pas un resultat vide -> login deja utilise
		succeed = cursor.next();
		
		//close connections
		cursor.close();
		st.close();
		co.close();
		
		return succeed;
	}
	
	public static boolean checkPasswd(String login,String mdp) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection co = Database.getMySQLConnection();
		//recup la ligne avec contenant ce login et mdp si elle existe
		String query = "SELECT * FROM users WHERE login=\"" + login + "\" AND psswd=\"" + mdp + "\";";
	
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		
		//si ma requete ne renvoie pas un resultat vide -> combi login, mdp correcte
		boolean succeed = cursor.next();
		
		//close connections
		cursor.close();
		st.close();
		co.close();
		
		return succeed;
	}
	
	public static boolean isConnected(String login) {
		
		return false;
	}
	
	public static String generateKey() {
		String key = "";
		char c;
		for(int i=0; i<32; i++) {
			Random r = new Random();
			if(Math.random() < 0.5) {
				//maj
				c = (char)(r.nextInt(26) + 'A');
				
			}else {
				//min
				c = (char)(r.nextInt(26) + 'a');
			}
			key += c;			
		}
		return key;		
	}
	
	public static JSONObject loginUser(String login, String mdp) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		
		//generate new connection key
		String key = insertConnection(login);
		return ServicesTools.serviceAccepted("key", key);
		
	}
	
	//inserer une connection et retourne une cle
	public static String insertConnection(String login) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection co = Database.getMySQLConnection();
		String userId = "\""+getUserId(login)+"\"";
		String key = "\""+ generateKey() + "\"";
		//ajout connection a la table session
		//SQL TRUE : 1, FALSE : 0
		String query = "INSERT INTO session VALUES("+key+", "+userId+ ", \"1\");";
		Statement st = co.createStatement();
		st.executeUpdate(query);
				
		//close connections
		st.close();
		co.close();
		
		return key;
	}
	
	public static JSONObject logOutUser(String login, String mdp) {
		
		return ServicesTools.serviceAccepted("key", "");
		
	}
	
	//recup id selon login
	public static int getUserId(String login) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		Class.forName("com.mysql.jdbc.Driver").newInstance();
		Connection co = Database.getMySQLConnection();
		//recup la ligne avec contenant ce login
		String query = "SELECT * FROM users WHERE login=\"" + login + "\";";
	
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		int id = -1;
		while(cursor.next()) {
			id = cursor.getInt("id");
		}
		
		//close connections
		cursor.close();
		st.close();
		co.close();
		
		return id;
	}
	
	
}