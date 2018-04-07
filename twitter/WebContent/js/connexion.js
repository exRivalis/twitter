function connexion(form){
    // console.log(form.html());
	var login = form.login.value;
    var passwd = form.psw.value;
    
	var ok = verif_connexion(login,passwd);
	if(ok){
        console.log("connexion")
		connecte(login,passwd);
	}else{
        console.log("error connexion");
    }

}

function verif_connexion(login,passwd) {
	if(login.length == 0 || passwd.length == 0){
		alert("Argument manquant");
		return false;
	}
	else{
		return true;
	}
}

// JSON.parse(res, revival)
// integrer 
// //pour ajax 
// en GET
// url : "user/login" par exemple

//etablie la connexion avec le servlet user/login
function connecte(login, pswd){
    // !noConnection
    if(!noConnection){     
        console.log("dedans aussi")
        $.ajax({
            type:"GET",
            url:"user/login",//comme indiqué dans web.xml
            data:"login="+login+"&mdp="+pswd,
            datatype:"json",
            success :function(resp){console.log("reponse")},
            error:function(jqXHR, textStatus, errorThrown){alert(textStatus);},
        });
    }
}

//traitement de la reponse du server: parser le JSON reçu
function responseConnexion(resp){
    console.log("ok");
    alert("yahooo");

}