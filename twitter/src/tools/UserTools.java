package tools;

import java.util.Random;

import org.json.JSONObject;
import errorjson.ServiceAccepted;

public class UserTools {
	public UserTools() {
		
	}
	
	public static JSONObject addUser(String login, String mdp, String nom, String prenom, String email) {
		
		return ServiceAccepted.serviceAccepted("ok", "ok");
	}
	
	public static boolean userExists(String login) {
		
		return false;
	}
	
	public static boolean checkPasswd(String login,String mdp) {
		
		return false;
	}
	
	public static boolean isConnected(String login) {
		
		return false;
	}
	
	public static String generateKey() {
		String key = "";
		char c;
		for(int i=0; i<32; i++) {
			Random r = new Random();
			if(Math.random() < 0.5) {
				//maj
				c = (char)(r.nextInt(26) + 'A');
				
			}else {
				//min
				c = (char)(r.nextInt(26) + 'a');
			}
			key += c;			
		}
		return key;		
	}
	
	
}
