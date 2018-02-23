package test;

import static org.junit.Assert.assertEquals;
import static org.junit.jupiter.api.Assertions.fail;

import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import service.User;

class UserTest {
	//test ajout nouveau user
	@Test
	void testCreateUser() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.User.createUser("michemiche", "chepa", "sardou", "michel");
		assertEquals("OK", result.get("status"));
	}

	//login existing user
	@Test
	void testLogin() throws InstantiationException, IllegalAccessException, ClassNotFoundException, JSONException, SQLException {
		JSONObject result = service.User.login("michemiche", "chepa");
		assertEquals("OK",result.get("status"));
	}

	//logout existing user
	@Test
	void testLogout() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, JSONException {
		JSONObject result = service.User.logout("bExympTvaNCJKnTnIhNhilvVpiKooykb");
		assertEquals("OK",result.get("status"));
	}

}
