package service;

import java.sql.Connection;
import java.sql.SQLException;

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
}
