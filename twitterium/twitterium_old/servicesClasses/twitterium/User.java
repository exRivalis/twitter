package twitterium;

import org.json.JSONException;
import org.json.JSONObject;

public class User {
	public static JSONObject CreateUser(String login, String name, String fname, String pwd) 
			throws JSONException {
		JSONObject ret = new JSONObject();
		if(login != null && name != null && fname != null && pwd != null)
			//user exists?
			
			ret.put("Status", "OK");
		else
			ret.put("Status", "KO");
		return ret;
	}
}
