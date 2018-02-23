package test;

import static org.junit.jupiter.api.Assertions.*;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;
import org.junit.jupiter.api.Test;

import com.mongodb.DBCollection;

import bd.Database;

class MessageTest {

	@Test
	void testCreateMessage() throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, UnknownHostException, JSONException {
		JSONObject result = service.Message.createMessage("bExympTvaNCJKnTnIhNhilvVpiKooykb", "teste message junit"	);
		assertEquals("OK", result.get("status"));
	}

}
