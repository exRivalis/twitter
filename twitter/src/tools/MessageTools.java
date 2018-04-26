package tools;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Iterator;

import org.bson.types.ObjectId;
import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBList;
import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;
import com.mongodb.DBObject;

import bd.Database;

public class MessageTools {
		
	//list my messages
	public static JSONObject listMessagesId(int id, DBCollection col, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		JSONObject messages = new JSONObject();
		JSONObject result = new JSONObject();
		int cpt = 0;
		
        BasicDBObject query = new BasicDBObject();
        query.put("user_id", id);
        // recuperation des messages de l'id
        DBCursor cursor = col.find(query);
        while(cursor.hasNext()) {
        	//affichage de chaque messages
        	try {
				messages.put(""+cpt++, cursor.next());
			} catch (JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
        }
        		
        return messages;
	}
	
	//get idCpt from ongodb
	public static int getIdCpt() throws UnknownHostException {
		//recupere le compteur d'id dans mongodb
		int idCpt=-1;
		DBCollection idCol = Database.getCollection("idCpt");
		DBCursor cursor = idCol.find();
        if(cursor.hasNext()) {
        	Object obj = (cursor.next()).get("id");
        	idCpt = (int) Double.parseDouble(obj.toString());
        }
        
        return idCpt;
	}
	
	//update idCpt in mongodb
	public static void updateIdCpt(int id) throws UnknownHostException {
		DBCollection idCol = Database.getCollection("idCpt");
		DBObject searchQuery = new BasicDBObject().append("id", id);
		DBObject newCpt = new BasicDBObject().append("id", ++id);
		idCol.update(searchQuery, newCpt);
	}
}

