package servlet.user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import tools.ServicesTools;

public class Logout extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String key = request.getParameter("key");
		JSONObject result = new JSONObject();
		if(key.length() == 0)
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		else {
			//call service login
			try {
				result = service.User.logout(key);
			}catch(Exception e) {
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
