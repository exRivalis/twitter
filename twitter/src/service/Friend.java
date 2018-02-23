package service;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.FriendTools;
import tools.ServicesTools;
import tools.UserTools;

public class Friend {
	//ajout ami avec key et friend_id
	public static JSONObject addFriend(String key, String id_friend) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//etablissement connexion
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
	    //appel tools
	    JSONObject res = FriendTools.addFriend(key, id_friend, co);
	    
	    //close connection
	    co.close();
	    return res;
	}
	
	//supprimer ami avec key et friend_id
	public static JSONObject removeFriend(String key, String id_friend) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//etablissement connexion
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
	    //appel tools
	    JSONObject res = FriendTools.removeFriend(key, id_friend, co);
	    
	    //close connection
	    co.close();
	    return res;
	}
	
	//cherche un ami avec nom et prenom
	public static JSONObject search(String nom, String prenom) throws SQLException, JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		//etablissement connexion
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			    Connection co = Database.getMySQLConnection();
			    
			    return FriendTools.search(nom, prenom, co);
	}
	
	//cherche un ami avec nom
	public static JSONObject searchNom(String nom) throws SQLException, JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		//etablissement connexion
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			    Connection co = Database.getMySQLConnection();
			    
			    return FriendTools.search(nom, null, co);
	}
	
	//cherche un ami avec prenom
	public static JSONObject searchPrenom(String prenom) throws SQLException, JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		//etablissement connexion
				Class.forName("com.mysql.jdbc.Driver").newInstance();
			    Connection co = Database.getMySQLConnection();
			    
			    return FriendTools.search(null, prenom, co);
	}
}
