//recup les messages du serveur ou de la bd local en cas de noConnection

function completeMessages(){
	$.ajax({
		type: "GET",
		url: "message/listall",
		data: "",
		datatype: "JSON",
		success: function(resp){completeMessagesResponse(resp)},
		error: function(jqXHR, textStatus, errorThrown){alert("error servlet");},
	})
}

//gestion de la réponse du serveur quand elle arrive
function completeMessagesResponse(resp){
	// TODO maj env.minId/ maxId/ msgs
	//Message(id,auteur, texte, date, comments)

	var messagesHtml = "";
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		messages = res.messages
		
		for(var key in messages){
			var msgMeta = messages[key]
			//recup des commentaire
			var coms = []			
			for(var c in msgMeta.commentaires){
				var com = msgMeta.commentaires[c]
				coms.push(new Comment(com.user_id, com.user_id, com.text, com.date))				
			}
			console.log(msgMeta);
			
			var msg = new Message(msgMeta.id, msgMeta.user_id, msgMeta.text, msgMeta.date, coms)
			env.msgs[msg.id]=(msg)			
			messagesHtml += msg.getHtml()

			//update idMin et idMax
			if(env.idMin > msgMeta.id)
				env.idMin = msgMeta.id
			if(env.idMax < msgMeta.id)
				env.idMax = msgMeta.id
	  	}
	   $('#messages_container').html(messagesHtml);
	//    console.log("env", env.msgs);
	   
	}
	else{
		alert(res.error)
	}
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
//afficher ou cacher les commentaires d'un messages
function developpeMessage(m_id){
	// console.log($("#message_"+m_id).find(".commentaires").html().length);
	
	if($("#message_"+m_id).find(".commentaires").html().length == 0){
		//s'il n y a rien dans la div commentaires il faut developper sinon couvrir
		//avant de developper un message couvrir tous les autres et changer l'image qui'l y a dedans
		$(".commentaires").html("")
		// $(".show_comments").find(".image")...

		var coms = ""
		//ajout des commentaires
		for(var i in env.msgs[m_id].comments){
			coms += env.msgs[m_id].comments[i].getHtml();
		}
		//ajout de la zone de saisi d'un nouveau commentaire
		coms += "<div id='new_com'><textarea id ='new_com_input' type='text' placeholder='Ecrivez un commentaire...'></textarea>"
		coms += "<input id='new_com_submit' type='submit' onclick='posterCommentaire("+JSON.stringify(m_id)+", $(\"#new_com_input\").val())' value='Poster'></div>";
		
		//ajouter le tout dans la div#messages_id.commentaires
		$("#message_"+m_id).find(".commentaires").html(coms);
	}
	else{
		//couvrir le message
		$("#message_"+m_id).find(".commentaires").html("")
	}
}

//cacher les commentaires d'un message
function hideMessage(m_id){
	var html = "<div class='show_comments' onclick='javascript:developpeMessage("+JSON.stringify(m_id) +")'/>"
	$("#message_"+m_id).find(".commentaires").html(html);
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


//poster un message -> creer un nouveau message
function posterMessage(text){
	if(text.length == 0){
		alert("Rien à poster")
	}	
	else{
		$.ajax({
			type: "GET",
			url: "message/create",
			data: "key="+env.key+"&text="+text,
			datatype: "JSON",
			success: function(resp){responseMessage(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert("error servlet");},
		})
	}	
}

function responseMessage(resp){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		alert("Message posté")
		$("#new_message_input").val("")
	}
	else{
		alert(res.error)
	}
}

//TODO poster un commentaire avec id du proprio du message + celui du commentaire etc
function posterCommentaire(m_id, text){
	if(text.length == 0){
		alert("Rien à poster")
	}	
	else{
		$.ajax({
			type: "GET",
			url: "message/addcom",
			data: "key="+env.key+"&text="+text+"&msgId="+m_id,
			datatype: "JSON",
			success: function(resp){responseCommentaire(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert(errorThrown);},
		})
	}
}

function responseCommentaire(resp){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		alert("Commentaire posté")
		$("#new_com_input").val("")
	}
	else{
		alert(res.error)
	}
}