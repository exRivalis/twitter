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

	var messagesHtml = ""
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		messages = res.messages
		
		for(var key in messages){
			var msgMeta = messages[key]			
			var msg = new Message(msgMeta._id, msgMeta.user_id, msgMeta.text, msgMeta.date, [])
			env.msgs.push(msg)			
			messagesHtml += msg.getHtml()

			//update idMin et idMax
			if(env.idMin > msgMeta._id)
				env.idMin = msgMeta._id
			if(env.idMax < msgMeta._id)
				env.idMax = msgMeta._id
	  	}
	   $('#messages_container').html(messagesHtml);
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