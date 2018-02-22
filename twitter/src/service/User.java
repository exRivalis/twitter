package service;


import java.sql.Connection;
import java.sql.SQLException;

import org.json.JSONException;
import org.json.JSONObject;

import bd.Database;
import tools.ServicesTools;
import tools.UserTools;

public class User {
	//creer un nouvel utilisateur
	public static JSONObject createUser(String login, String mdp, String nom, String prenom) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		if (login == null || mdp == null || nom == null || prenom == null) {			
			//informer du succes ou echec de l'operation
			return ServicesTools.serviceRefused("arguments manquants", -1);
			}

		//tester si login deja utilise
		if(UserTools.userExists(login, co))
			return ServicesTools.serviceRefused("Login indisponnible", -1);
		
		/*
		 * inserer user dans la BD 
		 */
		return UserTools.addUser(login, mdp, nom, prenom, co);
		
	}
	
	//se connecter avec un compte existant
	public static JSONObject login(String login, String mdp) throws JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
		
		if (login == null || mdp == null) {
			return ServicesTools.serviceRefused("argument manquant", -1);
		}
		
		//si l'utilisateur n'existe pas on arrete
		boolean is_user = tools.UserTools.userExists(login, co);
		if(!is_user) {
			return ServicesTools.serviceRefused("Utilisateur inexistant", -1);
		}
		
		//si le mdp incorrect on arrete
		boolean mdp_ok = tools.UserTools.checkPasswd(login, mdp, co);
		if(!mdp_ok) {
			return ServicesTools.serviceRefused("Mot de passe incorrect", -1);
		}
	
		return tools.UserTools.loginUser(login,mdp, co);
	}
	
	
	//se deconnecter
	public static JSONObject logout(String key) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    
		if (key == null) {
			return ServicesTools.serviceRefused("argument manquant", -1);
		}
		
		boolean is_connected = tools.UserTools.isConnected(key, co);
		if(!is_connected) {
				return ServicesTools.serviceRefused("User deja deconnecté", -1);
			
		}
		
		return tools.UserTools.logoutUser(key, co);
		
	}
}