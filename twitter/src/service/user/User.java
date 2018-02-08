package service.user;

import org.json.JSONObject;

import errorjson.ServiceRefused;
import errorjson.ServiceAccepted;

import tools.UserTools;

public class User {
	
	public User() {
		
	}
	
	public static JSONObject createUser(String login, String mdp, String nom, String prenom, String email) {
		if (login == null || mdp == null || nom == null || prenom == null || email == null) {
			return ServiceRefused.serviceRefused("arguments manquants","-1");
			
		}
		
		//tester si login deja utilisé
		if(UserTools.userExists(login))
			return ServiceRefused.serviceRefused("Login deja existant", "-2");
		
		/*
		 * TODO
		 * insérer user dans la BD 
		 */
		return UserTools.addUser(login, mdp, nom, prenom, email);
		
	}
}
