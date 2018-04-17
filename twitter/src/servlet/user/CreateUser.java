package servlet.user;
import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

/*
 * cree un nouvel utilisateur et l'ajout a la bd
 * @param login, mdp, nom, prenom
 * @return JSONObject decrivant le deroulement de l'operation
 */
public class CreateUser extends HttpServlet{
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup parametre
		//System.out.println("okkkkk");
		String login = request.getParameter("login");
		String mdp = request.getParameter("mdp");
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		JSONObject result = new JSONObject();//contien la reponse seucces/echec
		
		try {
			result = service.User.createUser(login, mdp, nom, prenom);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(result.toString());
	}
}
