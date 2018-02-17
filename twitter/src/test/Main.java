package test;

import java.sql.SQLException;

public class Main {
	public static void main(String[] args) throws InstantiationException, IllegalAccessException, ClassNotFoundException, SQLException {
		/*Test.testAddUser("Jack", "mdp");
		System.out.println("AJout utilisateur avec succes");
		
		if(Test.testCheckPasswd("Michel", "mdp"))
			System.out.println("Test passwd avec succes");
		else {
			System.out.println("Test passwd echec");
		}*/
		
		//test insertConncetion when login
		if(Test.testInsertConnection("Jacko"))
			System.out.println("Test passwd avec succes");
		else {
			System.out.println("Test passwd echec");
		}
	}
}
