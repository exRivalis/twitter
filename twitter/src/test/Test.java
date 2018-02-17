package test;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import bd.UserTools;

public class Test {
	public static boolean testAddUser(String login, String mdp) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		JSONObject result = UserTools.addUser(login, mdp, "Camus", "Albert");
		try {
			if(result.getString("message").equals("OK"))
				return true;
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return false;
	}
	
	public static boolean testCheckPasswd(String login, String mdp) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException {
		return UserTools.checkPasswd(login, mdp);
	}
	
	public static boolean testInsertConnection(String login) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		String key = UserTools.insertConnection(login);
		System.out.println(key);
		
		return (key.length()> 0);
	}
}


