package user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

public class Login extends HttpServlet {
	public void Login() {
		
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) 
			throws IOException{
		String login = request.getParameter("login");
		String pwd = request.getParameter("pwd");
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
