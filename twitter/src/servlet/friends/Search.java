package servlet.friends;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import tools.ServicesTools;

public class Search extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String nom = request.getParameter("nom");
		String prenom = request.getParameter("prenom");
		JSONObject result = new JSONObject();
		
		if(nom.length() == 0 && prenom.length() == 0)
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		
		else {
			try {
				if(nom.length() == 0) {
					//search avec prenom
					result = service.Friend.searchPrenom(prenom);
				}else if(prenom.length() == 0){
					//search avec nom
					result = service.Friend.searchNom(nom);
				}else {
					//search avec nom et prenom
					result = service.Friend.search(nom, prenom);
				}
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
