package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.Random;

import org.json.JSONException;
import org.json.JSONObject;

public class UserTools {
	public UserTools() {
		
	}
	
	public static JSONObject addUser(String login, String mdp, String nom, String prenom, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//resultat de retour ok/ko
		JSONObject result = ServicesTools.serviceAccepted("succesfull");;
	
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
			result = ServicesTools.serviceRefused("error add to db", -1);
		}
		
		//close connections
		st.close();		
		
		return result;
	}
	
	public static boolean userExists(String login, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
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
		
		return succeed;
	}
	
	public static boolean checkPasswd(String login,String mdp, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//recup la ligne avec contenant ce login et mdp si elle existe
		String query = "SELECT * FROM users WHERE login=\"" + login + "\" AND psswd=\"" + mdp + "\";";
	
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		
		//si ma requete ne renvoie pas un resultat vide -> combi login, mdp correcte
		boolean succeed = cursor.next();
		
		//close connections
		cursor.close();
		st.close();
		
		return succeed;
	}
	
	//verif si id existe
	public static boolean checkID(String id, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//recup la ligne avec contenant ce login et mdp si elle existe
		String query = "SELECT * FROM users WHERE id='"+id+"';";
	
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		
		//si ma requete ne renvoie pas un resultat vide -> id existe
		boolean succeed = cursor.next();
		
		//close connections
		cursor.close();
		st.close();
		
		return succeed;
	}
	/*
	 * @param key
	 * @return true if connected
	 */
	public static boolean isConnected(String key, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		//recup la ligne avec contenant ce login
		String query = "SELECT * FROM session WHERE cle='"+key+"';";
	
		Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		boolean connected = false;
		while(cursor.next()) {
			connected = cursor.getBoolean("connected");
		}
		
		//close connections
		cursor.close();
		st.close();
		
		return connected;
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
	
	public static JSONObject loginUser(String login, String mdp, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		
		//generate new connection key
		String key = insertConnection(login, co);
		JSONObject res = ServicesTools.serviceAccepted("succesfully loged in");
		try {
			res.put("key", key);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
		
	}
	
	//inserer une connection et retourne une cle
	public static String insertConnection(String login, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		String userId = "\""+getUserId(login, co)+"\"";
		String key = generateKey();
		//ajout connection a la table session
		//SQL TRUE : 1, FALSE : 0
		String query = "INSERT INTO session VALUES('"+key+"', "+userId+ ", \"1\");";
		Statement st = co.createStatement();
		st.executeUpdate(query);
				
		//close connections
		st.close();
		
		return key;
	}
	
	public static JSONObject logoutUser(String key, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//modifier la ligne correspondante en inserant 0 au chanmp connected
		//si deja connecte on fait rien sinon on le deconnecte
		if(isConnected(key, co)) {
			//SQL TRUE : 1, FALSE : 0
			String query = "UPDATE session SET connected = '0' WHERE cle = \""+key+"\";";
			Statement st = co.createStatement();
			st.executeUpdate(query);
					
			//close connections
			st.close();
		}else{
			return ServicesTools.serviceRefused("deja deconnecte", -1);
		}
		
		
		return ServicesTools.serviceAccepted("Disconnected");
		
	}
	
	//recup id selon login
	public static int getUserId(String login, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
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
		
		return id;
	}
	
	//recup l'id d'un utilisateur en connaissant sa cle
	public static int getIdWithKey(String key, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException{
        //recupere l'id du detenteur de cette clé
        String query = "SELECT userId FROM session WHERE cle=\"" + key + "\";";
        Statement st = co.createStatement();
        ResultSet res = st.executeQuery(query);
        int id = -1;
        while(res.next()){
            id = res.getInt("userId");
        }
        //Close connections
        res.close();
        st.close();
        //si la cle est correcte on renvoie l'id, -1 sinon
        return id;
    }
   	
}