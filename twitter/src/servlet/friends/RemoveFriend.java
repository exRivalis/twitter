package servlet.friends;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import tools.ServicesTools;

public class RemoveFriend extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String key = request.getParameter("key");
		String id_friend = request.getParameter("id_friend");
		JSONObject result = new JSONObject();
		
		if(key.length() == 0 || id_friend.length() == 0)
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		
		//call service removeFriend
		try {
			result = service.Friend.removeFriend(key, id_friend);
		}catch(Exception e) {
			e.printStackTrace();
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
