package tools;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.json.JSONException;
import org.json.JSONObject;

public class FriendTools {
	 //Ajouter un amis
    public static JSONObject addFriend(String key, String id_friend, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException{
    	JSONObject res = ServicesTools.serviceAccepted("Ami ajouté");
    	// recuperer l'id via l'index
        int id = UserTools.getIdWithKey(key, co);
        
        //si id_friend exsite on continue sinon refuser service
        if(!UserTools.checkID(id_friend, co)) {
        	//id_friend n'existe pas
        	res = ServicesTools.serviceRefused("id_friend incorrect", -1);
        }else if(id == -1){
        	//key invalide
        	res = ServicesTools.serviceRefused("key invalide", -1);
        }else {
        	//tout va bien
        	
        	//Ajout dans la table amis de la relation
            String query = "INSERT INTO friends VALUES('"+id+"', '"+id_friend+ "', CURRENT_DATE());";
            Statement st = co.createStatement();
            //executer requete
            try {
    			st.executeUpdate(query);
    		} catch (SQLException e) {
    			res = ServicesTools.serviceRefused("error add to db", -1);
    		}
            //close connections
            st.close();
        }
        
        return res;
   
    }
   
    //supprimer un amis
    public static JSONObject removeFriend(String key, String id_friend, Connection co) throws SQLException, InstantiationException, IllegalAccessException, ClassNotFoundException{
        JSONObject res = ServicesTools.serviceAccepted("Ami supprimé");
    	// recuperer l'id via l'index
        int id = UserTools.getIdWithKey(key, co);
        //si key valide
        if(id == -1) {
        	res = ServicesTools.serviceRefused("key invalide", -10);
        }else if(!UserTools.checkID(id_friend, co)){
        	res = ServicesTools.serviceRefused("id_friend invalide", -10);
        }else {
        	Statement st = co.createStatement();
        	
        	//verif s'ils sont amis ou si id s'invente une vie
        	String query = "SELECT * FROM friends WHERE source = '"+id+"' AND cible = '"+id_friend+"';";
        	ResultSet cursor = st.executeQuery(query);
        	
        	if(cursor.next()) {
        		//supprimer de la table
                query = "DELETE FROM friends WHERE source = "+id+" AND cible = "+id_friend+ ";";	
                st.executeUpdate(query);
        	}else {
        		res = ServicesTools.serviceRefused("ne sont pas amis", -10);
        	}
        	
            
            //close connections
            st.close();
        }
        
       
        return res;
   
    }
    
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
			res = ServicesTools.serviceAccepted("empty");
		}
		
		return res;
    }
    
    //list des amis du user
  //cherche un amis avec nom, prenom ou les deux
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
