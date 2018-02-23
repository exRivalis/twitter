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
		JSONObject result = service.Friend.addFriend("bExympTvaNCJKnTnIhNhilvVpiKooykb", "3");
		
		assertEquals("OK", result.get("status"));
	}

	//supprime correctement
	@Test
	void testRemoveFriend() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		
	    
		JSONObject result = service.Friend.removeFriend("bExympTvaNCJKnTnIhNhilvVpiKooykb", "3");
		
		assertEquals("OK", result.get("status"));
	}
	
	//n'ajoute pas car inexistant
	void testAddFriendErro() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
	    
		JSONObject result = service.Friend.addFriend("bExympTvaNCJKnTsIhNhilvVpiKooykb", "3");
		
		assertEquals("KO", result.get("status"));
	}
	//ne supprime pas car introuvable
	@Test
	void testRemoveFriendError() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.Friend.removeFriend("bExyabTvaNCJKnTnIhNhilvVpiKooykb", "16");
		
		assertEquals("KO", result.get("status"));
	}
	
	//trouve un user existant avec nom et prenom
	@Test
	void testSearch() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.Friend.search("jack", "brown");
		
		assertEquals("found", result.get("message"));
	}
	
	//trouve un user existant avec nom et prenom
	@Test
	void testSearchNom() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.Friend.searchNom("jack");
		
		assertEquals("found", result.get("message"));
	}
	
	//trouve un user existant avec nom et prenom
	@Test
	void testSearchPrenom() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.Friend.searchPrenom("brown");
		
		assertEquals("found", result.get("message"));
	}
	
	//trouve un user inexistant
	@Test
	void testSearchError() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.Friend.search("jackooo", "brolkksa");
		
		assertEquals("empty", result.get("message"));
	}
}
