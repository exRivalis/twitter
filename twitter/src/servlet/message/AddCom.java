package servlet.message;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/*
 * ajoutter un commentaire a la bd
 * @param key, text, msgId,  
 * @return JSONObject decrivant le deroulement de l'operation
 */
public class AddCom extends HttpServlet{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup parametre
		String key = request.getParameter("key");
		String text = request.getParameter("text");
		String msgId = request.getParameter("msgId");
		JSONObject result = new JSONObject();//contien la reponse seucces/echec
		
		if(key==null || text==null || msgId==null) {
			result = tools.ServicesTools.serviceRefused("argument invalides", -1);
		}
		else {
			try {
				result = service.Message.addCom(key, msgId, text);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(result.toString());
	}
}