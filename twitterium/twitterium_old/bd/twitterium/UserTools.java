package twitterium;

import org.json.JSONException;
import org.json.JSONObject;

public class UserTools {
	JSONObject userExists(String name) throws JSONException {
		JSONObject ret = new JSONObject();
		
		//pour le moment pas de bd donc renvoie erreur sql
		ret = ServiceRefused.ServiceRefused("KO", 1000);
		return ret;
	}
}
