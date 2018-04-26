package servlet.message;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/*
 * supprimer un commentaire de la bd
 * @param key, idC, idM,  
 * @return JSONObject decrivant le deroulement de l'operation
 */
public class DeleteComment extends HttpServlet{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup parametre
		String key = request.getParameter("key");
		String idM = request.getParameter("idM");
		String idC = request.getParameter("idC");
		JSONObject result = new JSONObject();//contien la reponse seucces/echec
		
		if(key==null || idM==null || idC==null) {
			result = tools.ServicesTools.serviceRefused("argument invalides", -1);
		}
		else {
			try {
				result = service.Message.deleteCommentaire(idM, idC, key);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(result.toString());
	}
}