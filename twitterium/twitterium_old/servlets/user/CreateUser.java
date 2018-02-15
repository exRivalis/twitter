package user;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import twitterium.User;

import org.json.JSONObject;

public class CreateUser extends HttpServlet {
	public CreateUser() {
		super();
	}
	
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup param
		String login = request.getParameter("login");
		String name = request.getParameter("name");
		String fname = request.getParameter("fname");//nom de famille
		String pwd = request.getParameter("pwd");
		
		JSONObject ret;
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		//appel service
		try {
			ret = User.CreateUser(login, name, fname, pwd);
			out.print(ret.toString());
			
		}catch(Exception e) {
			System.out.println(e.getStackTrace());
		}
		
	}
}



	
