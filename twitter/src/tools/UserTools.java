package tools;

import org.json.JSONObject;
import errorjson.ServiceAccepted;

public class UserTools {
	public UserTools() {
		
	}
	
	public static JSONObject addUser(String login, String mdp, String nom, String prenom, String email) {
		
		return ServiceAccepted.ServiceAccepted("ok", "ok");
	}
}
