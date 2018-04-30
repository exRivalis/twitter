package tools;

import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.json.JSONException;
import org.json.JSONObject;

import com.mongodb.BasicDBObject;
import com.mongodb.DBCollection;
import com.mongodb.DBObject;
import com.mongodb.MapReduceCommand;
import com.mongodb.MapReduceOutput;

import bd.Database;

public class MPTools {
	//retourne le resultat du Map Reduce sous forme d'un iterable DBObject
	public static Iterable<DBObject> mapReduce() throws UnknownHostException {
		DBCollection col = Database.getCollection("messages");
		String map = "function (){\n" + 
				"    var text = this.text;\n" + 
				"    var id = this.id;    \n" + 
				"    var words = text.match(/\\w+/g);\n" + 
				"    var tf = {};\n" + 
				"    for(var i=0; i<words.length; i++){\n" + 
				"        if(tf[words[i]] == null)\n" + 
				"            tf[words[i]] = 1;\n" + 
				"        else\n" + 
				"            tf[words[i]] += 1;\n" + 
				"    }\n" + 
				"    for (w in tf){       \n" + 
				"        var ret = {};\n" + 
				"        ret[id] = tf[w];\n" + 
				"        emit(w, ret);\n" + 
				"    }\n" + 
				"}";
		String reduce = "function(key, values){\n" + 
				"    var ret = {};\n" + 
				"    for(var i=0; i<values.length; i++){\n" + 
				"        for(d in values[i]){\n" + 
				"            ret[d] = values[i][d];\n" + 
				"        }\n" + 
				"    }\n" + 
				"    return ret;\n" + 
				"}";
		String finalize = "function(k, v){\n" +
				"    var df = Object.keys(v).length;\n" + 
				"    for(d in v){\n" + 
				"        v[d] = v[d]*Math.log(N/df);\n" + 
				"    }\n" + 
				"return v;"+
				"}";
		//String out = null;
		MapReduceCommand cmd = new MapReduceCommand(col, 
													map, 
													reduce, 
													null,
													MapReduceCommand.OutputType.REPLACE.INLINE, null);
		cmd.setFinalize(finalize);
		BasicDBObject m = new BasicDBObject();
		m.put("N", col.count());
		cmd.setScope(m);
		MapReduceOutput out = col.mapReduce(cmd);
//		for(DBObject obj: out.results())
//			System.out.println(obj);
		return out.results();
	}

	public static JSONObject search(String text) throws UnknownHostException, JSONException {
		Set<String> words = new HashSet();
		JSONObject scores = new JSONObject();
		for(String w:text.split(" "))
			words.add(w);
		
		Iterable<DBObject> map = mapReduce();
		for(DBObject o: map) {
			//un des mots qu'on cherche
			if(words.contains(o.get("_id"))) {
				//id des messages contenant un de ses mots
//				System.out.println(o);
				BasicDBObject values = (BasicDBObject)o.get("value");
				Set<String> keySet = values.keySet();
				for(String key:keySet) {
					//System.out.println(values.get(key));
					
					if(scores.isNull(key)) {
						scores.put(key, values.getInt(key));
					}
					else {
						double tt = scores.getDouble(key) + values.getDouble(key);
						scores.put(key, tt);
					}
				}
			}
		}
//		if(scores.length() > 0) {
//			 sorted = new ArrayList<>();
//			Iterator keys = scores.keys();	
//			while(keys.hasNext()) {
//				String k = (String)keys.next();
//				sorted.add(scores.getDouble(k));
//			}
//			
//			Collections.reverse(sorted);
//			System.out.println(sorted);
//			
//			scores.get
//			
//		}
		
		return scores;
	}
}