package servlet.message;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/*
 * supprimer un message de la bd
 * @param key, msgId,  
 * @return JSONObject decrivant le deroulement de l'operation
 */
public class DeleteMessage extends HttpServlet{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup parametre
		String key = request.getParameter("key");
		String id = request.getParameter("id");
		JSONObject result = new JSONObject();//contien la reponse seucces/echec
		
		if(key==null || id==null) {
			result = tools.ServicesTools.serviceRefused("argument invalides", -1);
		}
		else {
			try {
				result = service.Message.deleteMessage(id, key);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(result.toString());
	}
}