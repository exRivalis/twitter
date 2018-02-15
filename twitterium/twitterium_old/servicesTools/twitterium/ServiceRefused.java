package twitterium;

import org.json.JSONException;
import org.json.JSONObject;

public class ServiceRefused {
	public static JSONObject ServiceRefused(String n, int idError) throws JSONException {
		JSONObject response = new JSONObject();
		
		response.put("satuts", n);
		response.put("idError", idError);
		
		return response;
	}
}
