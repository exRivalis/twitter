package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

public class FriendTools {
    
    //cherche un amis avec nom, prenom ou les deux
    public static JSONObject search(String nom, String prenom, Connection co) throws SQLException, JSONException {
    	JSONObject users = new JSONObject(), res;
    	
    	String query;
    	//si prenom = null on cherche selon nom
    	if(prenom == null)
    		query = "SELECT * FROM users WHERE nom = '" +nom+"';";
    	//sinon si nom = null on cherche selon prenom
    	else if (nom == null)
    		query = "SELECT * FROM users WHERE prenom = '"+prenom+"';";
    	//sinon on cherche selon les deux
    	else
    		query = "SELECT * FROM users WHERE nom = '" +nom+ "' AND prenom = '"+prenom+"';";
    	
    	Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		while(cursor.next()) {
			//creation JSONObkect decrivant chaque user trouve
			JSONObject u = new JSONObject();
			u.put("id", cursor.getString("id"));
			u.put("login", cursor.getString("login"));
			u.put("nom", cursor.getString("nom"));
			u.put("prenom", cursor.getString("prenom"));
			
			//ajout resultats de la requete a mon json object
			users.put(cursor.getString("login"), u);
		}
		if(users.length() > 0) {
			//si au moins un user repondant aux criteres, on les ajoute au json
			res = ServicesTools.serviceAccepted("found");
			res.put("users", users);
		}else {
			//sinon on previent que pas de resultats
			res = ServicesTools.serviceAccepted("notfound");
		}
		
		return res;
    }
    public static JSONObject listFriends(String key, Connection co) throws SQLException, JSONException, InstantiationException, IllegalAccessException, ClassNotFoundException {
    	JSONObject users = new JSONObject(), res;
    	
    	int user_id = UserTools.getIdWithKey(key, co);
    	
    	String query = "SELECT cible FROM friends WHERE source= '" +user_id+ "';";
    	
    	Statement st = co.createStatement();
		ResultSet cursor = st.executeQuery(query);
		while(cursor.next()) {
			//pour chaque id on recup user info
			//creation JSONObkect decrivant chaque user trouve
			int id = cursor.getInt("cible");
			JSONObject user = UserTools.getInfo(id, co);
			//System.out.println(id);
			
			users.put(""+id, UserTools.getInfo(id, co));
			
		}
		
		
		return users;
}
}
