//recup les messages du serveur ou de la bd local en cas de noConnection
function completeMessages(){
	var messages = []
	if(env.noConnection){
		//bd locale
		messages = getFromLocalDb(-1, -1, -1, -1);


	}
	else{
		// serveur
		// TODO
	}

	messagesHtml = ""
	for(var i=0; i<messages.length; i++){
		messagesHtml += messages[i].getHtml();
	}
	$('#messages_container').html(messagesHtml);
}

//gestion de la réponse du serveur quand elle arrive
function completeMessagesResponse(){
	// TODO maj env.minId/ maxId/ msgs
}

//retourne une liste de messages a partir de la nd locale triée par ordre décroissant de l'id
function getFromLocalDb(from, idMin, idMax, nbMax){
	//from; id du proprietaire de la page concernee
	var messages = []
	for(var i=0; i<localdb.length; i++){
		var m = localdb[i]
		if(idMin > 0 && idMax >0){
			if(m.id >= idMin && m.id < idMax){
				messages.push(m)
				if(messages.length == nbMax)
					break;
			}
		}
		else{
			if(idMax < 0 ){
				messages.push(m);
				if(messages.length == nbMax)
					break;
			}
			else{
				if(m.id < idMax){
					messages.push(m)
					if(messages.length == nbMax)
						break;
				}
			}
		}
	}

	//maj env.msg avec les nouveau messages
	for(var i =0; i<messages.length; i++){
		var m = messages[i];
		env.msg[m.id] = m;
		// console.log(m);
	}

	//truer par ordre decroissant de l'id
	messages.sort(function(a, b){return b.id - a.id});
	return messages;
}

//commentaires
//afficher les commentaires d'un messages
function developpeMessage(id){
	var m = env.msg[id];
	// var el = $("#message_"+id+".comments_message");
	$("#message_"+id).find("#show_comments").html("<input onclick='hideMessage("+id+")' type='image' src='../ressources/hide.png'/>");

	$("#message_"+id).find(".comments_message").append(m.comments[0].getHtml());


	// console.log(mmmm);
}
//cacher les commentaires d'un message
function hideMessage(id){
	var m = env.msg[id];
	// var el = $("#message_"+id+".comments_message");
	$("#message_"+id).find("#show_comments").html("<input onclick='developpeMessage("+id+")' type='image' src='../ressources/show.png'/>");

	$("#message_"+id).find(".comments_message").html("");
	// console.log(mmmm);
}

function erreur(message){
    var msg = "<div id =\"message_erreur\">"+message+"></div>";
    if(message.length <= 0){
        $("form").prepend(msg);
    }
    else{
        $("#erreur").replaceWith(msg);
    }    
    $("#erreur").css({"color":"red"}); 
}