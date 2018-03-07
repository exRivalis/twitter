package service;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBCollection;

import bd.Database;
import tools.MessageTools;
import tools.ServicesTools;

public class Message {
	//create a new message
	public static JSONObject createMessage(String key, String text) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException, UnknownHostException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		//connection mongoDB
		DBCollection col = Database.getCollection("messages");
		
		//creation et ajout message a la mongoDB
		JSONObject res = MessageTools.createMessage(key, text, col, co);
		
		//close connections
		co.close();
		
		return res;
	}
	
	//recup message d'un user en particuler
	public static JSONObject listMessages(String key) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException, UnknownHostException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		//connection mongoDB
		DBCollection col = Database.getCollection("messages");
		
		//recuperation de la liste des messages
		JSONObject res = MessageTools.listMessages(key,col, co);
		
		//close connections
		co.close();
		
		return res;
		
	}
	
	//list all messages
	public static JSONObject listAllMessages() throws UnknownHostException {	    
		//connection mongoDB
		DBCollection col = Database.getCollection("messages");
		
		//recuperation de la liste des messages
		JSONObject res = MessageTools.listAllMessages(col);
		
		
		return res;
	}
	
	//list all messages
	public static JSONObject listMessagesFriends(String key) throws UnknownHostException, InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {	    
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
		//connection mongoDB
		DBCollection col = Database.getCollection("messages");
		
		//recuperation de la liste des messages
		JSONObject res = MessageTools.listMessagesFriends(key, col, co);
		
		
		return res;
	}
		
}
