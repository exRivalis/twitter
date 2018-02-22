package bd;
import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import com.mongodb.DB;
import com.mongodb.DBCollection;
import com.mongodb.MongoClient;

public class Database {

		private DataSource dataSource;
		private static Database database=null;
		
		public Database(String jndiname) throws SQLException {
			try {
				dataSource = (DataSource) new InitialContext().lookup("java:comp/env/" + jndiname);
			} catch (NamingException e) {
			// Handle error that it’s not configured in JNDI.
				throw new SQLException(jndiname + " is missing in JNDI! : "+e.getMessage());
			}
		}
		
		public Connection getConnection() throws SQLException {
			return dataSource.getConnection();
		}
		
		public static Connection getMySQLConnection() throws SQLException {
			if (DBStatic.pooling==false) {
				return(DriverManager.getConnection("jdbc:mysql://" + DBStatic.localhost_mysql + "/" +
						DBStatic.db_mysql, DBStatic.login, DBStatic.password));
			}
			else {
			if (database==null) {
				database=new Database("jdbc/db");
			}
			return(database.getConnection());
			}
		}
		
		public static DBCollection getCollection(String collection) throws UnknownHostException {
			//connexion mongnoDB
			MongoClient mongo = new MongoClient(DBStatic.localhost_mongo);
			//recup bd
			DB db = mongo.getDB(DBStatic.db_mongo);
			//return collection
			return db.getCollection(collection);
		}
			
}

