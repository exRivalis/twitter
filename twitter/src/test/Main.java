package test;

import java.net.UnknownHostException;
import java.sql.Connection;
import java.sql.SQLException;

import javax.swing.plaf.synth.SynthSeparatorUI;

import com.mongodb.DBCollection;

import bd.Database;

public class Main {
	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException, UnknownHostException {
		//creation connection
		Class.forName("com.mysql.jdbc.Driver").newInstance();
	    Connection co = Database.getMySQLConnection();
	    //connection mongoDB
	  	DBCollection col = Database.getCollection("messages");
	  		
		Test.testAddUser("Jack", "mdp", co);
		System.out.println("AJout utilisateur avec succes");
		
		if(Test.testCheckPasswd("Michel", "mdp", co))
			System.out.println("Test passwd avec succes");
		else {
			System.out.println("Test passwd echec");
		}
		
		//test insertConncetion when login
		if(Test.testInsertConnection("Jacko", co))
			System.out.println("Test passwd avec succes");
		else {
			System.out.println("Test passwd echec");
		}
		
		//test isConnected
		Test.testIsConnected("aphihYXBuSRZSUqTVACYEqMhvqwtXwsK", co);
		System.out.println("Test isConnected avec succès");
		
		//test deconnection
		if(Test.testLogout("aphihYXBuSRZSUqTVACYEqMhvqwtXwsK", co))
			System.out.println("Test deconnection avec succes");
		else {
			System.out.println("Test deconnection echec");
		}
		
		//test getIdwidthKey
		Test.testGetIdWithKey("aphihYXBuSRZSUqTVACYEqMhvqwtXwsK", co);
		System.out.println("Succès getid with key");
		
		//test createMessage
		Test.testCreateMessage("aphihYXBuSRZSUqTVACYEqMhvqwtXwsK", "un petit mot pour le test, un grand commentaire pour le servlet!", co, col);
	}
}
