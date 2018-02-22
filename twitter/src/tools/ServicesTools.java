package tools;

import org.json.JSONException;
import org.json.JSONObject;

public class ServicesTools {
	
	public static JSONObject serviceAccepted(String message) {
		JSONObject res = new JSONObject();
		try {
			//service accepted tjrs OK
			res.put("status", "OK");
			res.put("message", message);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
	
	public static JSONObject serviceRefused(String message, int code) {
		JSONObject res = new JSONObject();
		try {
			//service refused tjrs KO
			res.put("status", "KO");
			res.put("error", message);
			res.put("code", code);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
}
