package servlet.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import tools.ServicesTools;

public class Login extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String login = request.getParameter("login");
		String mdp = request.getParameter("mdp");
		JSONObject result = new JSONObject();
		System.out.println("login servlet");
		if(mdp == null || login == null) {
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		}
		else if(login.length() == 0 || mdp.length() == 0)
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		
		else {
			//call service login
			try {
				result = service.User.login(login, mdp);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
