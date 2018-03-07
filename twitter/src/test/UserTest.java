package test;

import static org.junit.Assert.assertEquals;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

class UserTest {
	//test ajout nouveau user
	/*@Test
	void testCreateUser() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.User.createUser("miche", "chep", "sardzdzdou", "michel");
		assertEquals("OK", result.get("status"));
	}
	
	//login existing user
		@Test
		void testLogin() throws InstantiationException, IllegalAccessException, ClassNotFoundException, JSONException, SQLException {
			JSONObject result = service.User.login("miche", "chep");
			assertEquals("OK",result.get("status"));
		}
	*/
	//logout existing user
	@Test
	void testLogout() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.User.logout("AuLxqSEjVNbGtEaXmCPcViKaVpDkWITg");
		assertEquals("OK",result.get("status"));
	}
		

}
