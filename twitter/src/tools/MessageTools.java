package tools;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.GregorianCalendar;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBCursor;

public class MessageTools {
	
	//creer et ajouter un message a la mongoDB
	public static JSONObject createMessage(String key, String text, DBCollection col, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		//creation du contenu du message
		BasicDBObject message = new BasicDBObject();
		//on recup user_id avec key
		int user_id = UserTools.getIdWithKey(key, co);
		//recup date actuelle
		GregorianCalendar calendar = new GregorianCalendar();
		Date ajd = calendar.getTime();
		
		//ajout elements
		message.put("user_id", user_id);
		message.put("text", text);
		message.put("date", ajd);
		
		//ajout message a la mongoDB
		col.insert(message);
		
		return ServicesTools.serviceAccepted("message ajoute");
	}

	public static JSONObject listMessages(String key, DBCollection col, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		JSONObject messages = new JSONObject();
		JSONObject result = new JSONObject();
		int cpt = 0;
		// recuperer l'id via l'index
		int id = UserTools.getIdWithKey(key, co);
        if(id == -1) {
        	return ServicesTools.serviceRefused("user inexistant", -1);
        }
        BasicDBObject query = new BasicDBObject();
        query = (BasicDBObject) query.put("id_user", id);
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
        
        result = ServicesTools.serviceAccepted("liste des messages");
        try {
			result.put("messages", messages);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
        return result;
	}
}

