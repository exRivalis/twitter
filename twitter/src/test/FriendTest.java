package test;

import static org.junit.jupiter.api.Assertions.*;

import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import bd.Database;
import tools.UserTools;

class FriendTest {
	//ajout correctement
	@Test
	void testAddFriend() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		JSONObject result = tools.FriendTools.addFriend("bExympTvaNCJKnTnIhNhilvVpiKooykb", "3", co);
		
		assertEquals("OK", result.get("status"));
	}

	//supprime correctement
	@Test
	void testRemoveFriend() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		JSONObject result = tools.FriendTools.removeFriend("bExympTvaNCJKnTnIhNhilvVpiKooykb", "3", co);
		
		assertEquals("OK", result.get("status"));
	}
	
	//n'ajoute pas car inexistant
	void testAddFriendErro() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		JSONObject result = tools.FriendTools.addFriend("bExympTvaNCJKnTsIhNhilvVpiKooykb", "3", co);
		
		assertEquals("KO", result.get("status"));
	}
	//ne supprime pas car introuvable
	@Test
	void testRemoveFriendError() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		JSONObject result = tools.FriendTools.removeFriend("bExyabTvaNCJKnTnIhNhilvVpiKooykb", "16", co);
		
		assertEquals("KO", result.get("status"));
	}
}
