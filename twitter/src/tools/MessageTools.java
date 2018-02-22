package tools;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Date;
import java.util.GregorianCalendar;

import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;

public class MessageTools {
	
	//creer et ajouter un message a la mongoDB
	public static JSONObject CreateMessage(String key, String text, DBCollection col, Connection co) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
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
}
