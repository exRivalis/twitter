package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.DBCollection;

import bd.Database;
import tools.MessageTools;
import tools.UserTools;

public class Test {
	public static boolean testAddUser(String login, String mdp, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		JSONObject result = UserTools.addUser(login, mdp, "Camus", "Albert", co);
		try {
			if(result.getString("status").equals("OK"))
				return true;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	
	public static boolean testCheckPasswd(String login, String mdp, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		return UserTools.checkPasswd(login, mdp, co);
	}
	
	public static boolean testInsertConnection(String login, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		String key = UserTools.insertConnection(login, co);
		System.out.println(key);
		
		return (key.length()> 0);
	}
	
	public static boolean testLogout(String key, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		JSONObject result = UserTools.logoutUser(key, co);
		System.out.println(result);
		
//		try {
//			return (result.get("task").equals("Disconnected"));
//		} catch (JSONException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		return true;
	}
	
	public static void testIsConnected(String key, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		boolean result = UserTools.isConnected(key, co);
		//System.out.println(result);
		
	}
	
	
	public static boolean testGetIdWithKey(String key, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		int result = UserTools.getIdWithKey(key, co);
		
		return result != -1;
	}
	
	//test createMessage
	public static boolean testCreateMessage(String key, String text, Connection co, DBCollection col) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		MessageTools.CreateMessage(key, text, col, co);
		return true;
	}
}


