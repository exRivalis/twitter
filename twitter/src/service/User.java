package service;


import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.UserTools;
import tools.ServicesTools;

public class User {
		
	//creer un nouvel utilisateur
	public static JSONObject createUser(String login, String mdp, String nom, String prenom) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		if (login == null || mdp == null || nom == null || prenom == null) {			
			//informer du succes ou echec de l'operation
			return ServicesTools.serviceRefused("arguments manquants","-1");
			}

		//tester si login deja utilise
		if(UserTools.userExists(login))
			return ServicesTools.serviceRefused("Login deja existant", "-2");
		
		/*
		 * inserer user dans la BD 
		 */
		return UserTools.addUser(login, mdp, nom, prenom);
		
	}
	
	//se connecter avec un compte existant
	public static JSONObject login(String login, String mdp) throws JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		if (login == null || mdp == null) {
			return ServicesTools.serviceRefused("argument manquant","-1");
		}
		
		boolean is_user = bd.UserTools.userExists(login);
		if(!is_user) {
			return ServicesTools.serviceRefused("Utilisateur inexistant","-2");
		}
		boolean mdp_ok = bd.UserTools.checkPasswd(login, mdp);
		if(!is_user) {
			return ServicesTools.serviceRefused("Utilisateur inexistant","-2");
		}
		
		return bd.UserTools.loginUser(login,mdp);
	}
	
	
	//se deconnecter
	public static JSONObject logOut(String login, String mdp) {
		if (login == null || mdp == null) {
			return ServicesTools.serviceRefused("argument manquant","-1");
		}
		
		boolean is_connected = bd.UserTools.isConnected(login);
		if(!is_connected) {
				return ServicesTools.serviceAccepted("User deja deconnecté","-1");
			
		}
		
		return bd.UserTools.logOutUser(login,mdp);
		
	}
}