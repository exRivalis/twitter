package servlet.message;

import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.JSONObject;

import tools.ServicesTools;

public class Search extends HttpServlet{
	public void doGet(HttpServletRequest request,HttpServletResponse response) throws IOException {
		String key = request.getParameter("key");
		String text = request.getParameter("text");
		JSONObject result = new JSONObject();
		if(key == null || text == null)
			result = ServicesTools.serviceRefused("check parameters", -2);
		else {
			try {
				result = service.Message.search(key, text);
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		
		response.setContentType("text/plain");
		PrintWriter out = response.getWriter();
		out.print(result.toString());
	}
}
