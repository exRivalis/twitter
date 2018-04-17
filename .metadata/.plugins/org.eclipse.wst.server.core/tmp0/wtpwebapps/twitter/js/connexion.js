function connexion(form){
    // console.log(form.html());
	var login = form.login.value;
    var passwd = form.psw.value;
    // console.log("connecte")
	var ok = verif_connexion(login,passwd);
	if(ok){
		connecte(login,passwd);
	}else{
        console.log("error connexion");
    }

}


// JSON.parse(res, revival)
// integrer 
// //pour ajax 
// en GET
// url : "user/login" par exemple

//etablie la connexion avec le servlet user/login
function connecte(login, pswd){
    $.ajax({
        type:"GET",
        url:"user/login",//comme indiqué dans web.xml
        data:"login="+login+"&mdp="+pswd,
        datatype:"json",
        success :function(resp){connexionResponse(resp, login)},
        error:function(jqXHR, textStatus, errorThrown){alert("error servlet");},
    });
    
}

//traitement de la reponse du server: parser le JSON reçu
function connexionResponse(resp, login){
    var res = JSON.parse(resp, revival)
    var status = res.status;
	if(status == "OK"){
        env.login = login;
        env.id = res.id;
        env.key = res.key; //la cle de connexion
        //stocker env dans les cookies pendant 30 jours
        createCookie("env", env, 30);
        makeMainPanel(env.id, env.login)
    }
    else{
        erreurMessage(res.error)
    }
}

function connexionResponse_local(){
	return false;

}


function erreurMessage(message){
    var msg = "<div id ='message_erreur_div'>"+message+"</div>";
    var error_div = $("form #message_erreur_div").html()
    if(error_div == undefined){
        $("form").prepend(msg);
    }
    else{
        $("form #message_erreur_div").replaceWith(msg);
    }    
    // $("#message_erreur").css({"color":"red"}); 
}


function verif_connexion(login,passwd) {
	if(login.length == 0 || passwd.length == 0){
		erreurMessage("Argument manquant");
		return false;
	}
	else{
		return true;
	}
}

//gestion inscription
function inscription(form){
    
    var login = form.login.value;
    var nom = form.nom.value;
    var prenom = form.prenom.value;
    var mdp = form.mdp.value;
    var remdp = form.remdp.value;

    if(remdp != mdp){
        erreurMessage("Vérifiez le mot de passe")
    }
    
    var ok = verif_inscription(login, nom, prenom, mdp);
    if(!ok){
        erreurMessage("Remplissez tous les champs")
    }else{
        register(login, nom, prenom, mdp);
    }                                                
};

function verif_inscription(login, nom, prenom, mdp){
    if(login.length == 0 || nom.length == 0 || prenom.length==0 || mdp.length==0){
        return false;
    }
    return true;    
}

function register(login, nom, prenom, mdp){
    $.ajax({
        type:"GET",
        url:"user/create",//comme indiqué dans web.xml
        data:"login="+login+"&mdp="+mdp+"&nom="+nom+"&prenom="+prenom,
        datatype:"json",
        success :function(resp){registerResponse(resp)},
        error:function(jqXHR, textStatus, errorThrown){alert("error servlet: " + errorThrown);},
    });
    
}

function registerResponse(resp){
    var res = JSON.parse(resp, revival)
    var status = res.status;
	if(status == "OK"){
        //si tout va bien afficher un message puis envoyer a la fenetre de connexion
        //TODO alert box message de succes
        alert("inscription reussie")
        makeConnexionPanel();
    }
    else{
        erreurMessage(res.error)
    }
}

//gestion logout
function logout(key){
    $.ajax({
        type: "GET",
        url: "user/logout",
        data: "key="+key,
        datatype: "JSON",
        success:function(resp){logoutResponse(resp)},
        error:function(jqXHR, textStatus, errorThrown){alert("error servlet");},
    })
}

function logoutResponse(resp){
    var res = JSON.parse(resp, revival);
    env.id = -1;
	env.login = -1;
    env.key = -1;
    createCookie("env", env, 30);
    makeMainPanel(-1, -1)
    
}