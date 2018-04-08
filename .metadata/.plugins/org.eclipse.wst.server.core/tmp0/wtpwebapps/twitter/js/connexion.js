function connexion(form){
    // console.log(form.html());
	var login = form.login.value;
    var passwd = form.psw.value;
    
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
    // !noConnection
    if(!noConnection){
        $.ajax({
            type:"GET",
            url:"user/login",//comme indiqué dans web.xml
            data:"login="+login+"&mdp="+pswd,
            datatype:"json",
            success :function(resp){connexionResponse(resp)},
            error:function(jqXHR, textStatus, errorThrown){alert("error servlet");},
        });
    }
}

//traitement de la reponse du server: parser le JSON reçu
function connexionResponse(resp){
    var status = resp.status;
    resp = JSON.parse(resp, revival)
    
	if(status == "OK"){
		var res = resp.res;
		console.log(res)
    }
    else{
        erreurMessage(resp.error)
    }
}

function connexionResponse_local(){
	return false;

}


function erreurMessage(message){
    var msg = "<div id ='message_erreur_div'>"+message+"</div>";
    var error_div = $("form #message_erreur_div").html()
    console.log(error_div)
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
		erreur("Argument manquant");
		return false;
	}
	else{
		return true;
	}
}


function inscription(nom,prenom,login,email,mdp,check_mdp){
    var form = document.getElementById("form");
    form.addEventListener('submit', function(e) {
        var login = form.elements.login.value;
        var nom = form.elements.nom.value;
        var prenom = form.elements.prenom.value;
        var mail = form.elements.mail.value;
        var mdp = form.elements.mdp.value;
        console.log(inscription(nom,prenom,login,email,mdp,check_mdp));
            if(!ok){
                console.log("la");
            }else{
                console.log("ok");
                }
                                                
    });

    var mdp = form.elements.mdp.value;
    console.log(inscription(nom,prenom,login,email,mdp,check_mdp));
        if(!ok){
            console.log("la");
        }else{
            console.log("ok");
            }
                                                
};