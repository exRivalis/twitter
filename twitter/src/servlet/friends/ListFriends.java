package servlet.friends;

import java.io.IOException;
import java.io.PrintWriter;
import java.sql.SQLException;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONException;
import org.json.JSONObject;

import service.Friend;
import tools.FriendTools;
import tools.ServicesTools;
import tools.UserTools;

public class ListFriends extends HttpServlet {
	public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
		//recup params
		String key = request.getParameter("key");
		
		JSONObject result = new JSONObject();
		
		if(key.length() == 0)
			result = ServicesTools.serviceRefused("Arguments invalides", -1);
		
		else {
			try {
				result = Friend.ListFriends(key);
			} catch (InstantiationException | IllegalAccessException | ClassNotFoundException | SQLException
					| JSONException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		
		out.print(result.toString());
	}
}
