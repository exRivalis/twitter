package service;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONObject;

import com.mongodb.DBCollection;

import bd.Database;
import tools.MessageTools;

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
}
