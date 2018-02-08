package service.user;

import org.json.JSONObject;

import errorjson.ServiceRefused;

public class User {
	
	public User() {
		
	}
	
	public static JSONObject CreateUser(String login, String mdp, String nom, String prenom, String email) {
		if (login == null || mdp == null || nom == null || prenom == null || email == null) {
			return ServiceRefused.ServiceRefused("arguments manquants","-1");
			
		}
		
		if(tools.UserTools.UserExists())
			return ServiceRefused.ServiceRefused("Login deja existant", "-2");
		}
	
	
}
