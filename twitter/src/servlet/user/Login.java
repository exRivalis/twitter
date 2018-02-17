package servlet.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Login extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String login = request.getParameter("login");
		String mdp = request.getParameter("mdp");
		JSONObject result = new JSONObject();
		
		//call service login
		try {
			result = service.User.login(login, mdp);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
