package tools;

import org.json.JSONException;
import org.json.JSONObject;

public class ServicesTools {
	
	public static JSONObject serviceAccepted(String message, String code) {
		JSONObject res = new JSONObject();
		try {
			//service accepted tjrs OK
			res.put("status", "OK");
			res.put(message, code);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return res;
	}
	
	public static JSONObject serviceRefused(String message, String code) {
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
