package tools;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

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
        	//Ajout dans la table amis de la relation
            String query = "DELETE FROM friends WHERE source = "+id+" AND cible = "+id_friend+ ";";
            Statement st = co.createStatement();
            st.executeUpdate(query);
            //close connections
            st.close();
        }
        
       
        return res;
   
    }

}
