package user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Logout extends HttpServlet {
	public void Logout() {
		
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws IOException{
		String login = request.getParameter("login");
		String key = request.getParameter("key");
		
		JSONObject ret;
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		try {
			
		}catch(Exception e) {
			System.out.println(e.getStackTrace());
		}
	}
}
