//recup les messages du serveur ou de la bd local en cas de noConnection
function completeMessages(id){
	/*
	* skip: sauter les skip premiers elements
	* limit: recuperer les env.nbMax premiers elements
	*/
	var servlet = ""
	var servletData = ""
	env.nbMax = 10
	// env.skip = 0
	//console.log("complete")
	if(env.id != -1){
		if(id == -1){
			servlet = "message/listall"
			servletData = "key="+env.key+"&limit="+env.nbMax+"&skip="+env.skip
			//console.log(servletData)
		}
		else{
			servlet = "message/list"
			servletData = "key="+env.key+"&id="+id+"&limit="+env.nbMax+"&skip="+env.skip
			//console.log(servletData)
		}
		$.ajax({
			type: "GET",
			url: servlet,
			data: servletData,
			datatype: "JSON",
			success: function(resp){completeMessagesResponse(resp, id)},
			error: function(jqXHR, textStatus, errorThrown){alert("error servlet");},
		})
	}
}

//gestion de la réponse du serveur quand elle arrive
function completeMessagesResponse(resp, mid){
	
	var messagesHtml = "";
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		messages = res.messages
		//maj env.skip pour la prochine recup
		// env.skip += messages
		env.skip += Object.keys(messages).length;
		
		for(var key in messages){
			var msgMeta = messages[key]
			//recup des commentaire
			var coms = []
			for(var c in msgMeta.commentaires){
				var com = msgMeta.commentaires[c]
				//console.log(com.date);
				
				coms.push(new Comment(com.id, msgMeta.id, com.auteur, com.text, com.date))				
			}
			
			var msg = new Message(msgMeta.id, msgMeta.auteur, msgMeta.text, msgMeta.date, coms)
			
			env.msgs[msg.id]=msg			
			//update idMin et idMax
			if(env.idMin > msgMeta.id)
				env.idMin = msgMeta.id
			if(env.idMax < msgMeta.id)
				env.idMax = msgMeta.id
		  }
		for(var key in env.msgs){
			messagesHtml = env.msgs[parseInt(key)].getHtml() + messagesHtml			
		}
		  //ajout bouton charger
		  messagesHtml += "<a id='charger' onclick='completeMessages("+mid+")'>Plus de posts</a>"
	   $('#messages_container').html(messagesHtml);
		
	   //update messages when on bottom of the page
	//    function handleScrollDown(event){
	// 		if($(window).scrollTop() + $(window).height() == $(document).height()) {
	// 			alert("bottom!");
	// 		}
	//    }
	//    window.addEventListener("scroll", handleScrollDown, false);	   
	}
	else if(res.error = "timeout"){
		$(makeConnexionPanel)
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
		//console.log(m_id);
		//console.log(env.msgs);
		
		
		for(var i in env.msgs[m_id].comments){
			//console.log(env.msgs[m_id].comments[i]);
			coms += env.msgs[m_id].comments[i].getHtml();
		}
		//ajout de la zone de saisi d'un nouveau commentaire
		coms += "<div id='new_com'><textarea id ='new_com_input' type='text' placeholder='Ecrivez un commentaire...'></textarea>"
		coms += "<input id='new_com_submit' type='submit' onclick='posterCommentaire("+JSON.stringify(m_id)+", $(\"#new_com_input\").val())' value='Poster'></div>";
		
		//ajouter le tout dans la div#messages_id.commentaires
		$("#message_"+m_id).find(".commentaires").html(coms);
		//changer le sens de la flèche
		$("#message_"+m_id).find(".show_comments").html("<i class='fa fa-sort-up' id='hide_comments'></i>")
	}
	else{
		//couvrir le message
		$("#message_"+m_id).find(".commentaires").html("")
		//changer le sens de la flèche
		$("#message_"+m_id).find(".show_comments").html("<i class='fa fa-sort-down' id='developpe_comments'></i>")
	}

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
function posterMessage(id, text){
	if(text.length == 0){
		alert("Rien à poster")
	}	
	else{
		$.ajax({
			type: "GET",
			url: "message/create",
			data: "key="+env.key+"&text="+text+"&cible="+id,
			datatype: "JSON",
			success: function(resp){responseMessage(id, resp)},
			error: function(jqXHR, textStatus, errorThrown){alert("error servlet");},
		})
	}	
}

function responseMessage(id, resp){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		// alert("Message posté")
		$("#new_message_input").val("")
		//ajout post a la page
		var msg = new Message(res.data.id, res.data.auteur, res.data.text, res.data.date, [])
		$("#messages_container").prepend(msg.getHtml())
		//$(makeMainPanel(id, env.login));
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
			success: function(resp){responseCommentaire(resp, m_id)},
			error: function(jqXHR, textStatus, errorThrown){alert(errorThrown);},
		})
	}
}

function responseCommentaire(resp, m_id){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		// alert("Commentaire posté")
		$("#new_com_input").val("")
		// ajouter le commentaire a env
		var c = res.commentaire;
		var com = new Comment(c.id, c.idm, c.auteur, c.text, c.date);
		env.msgs[m_id].comments.push(com);
		//mettre a jour la section commenatire
		$(reloadMessage(res, m_id));
	}
	else{
		alert(res.error)
	}
}

//recharger la section commentaire
function reloadMessage(res, m_id){	
	//rechargement des commentaires
	var coms = ""
	for(var i in env.msgs[m_id].comments){
		coms += env.msgs[m_id].comments[i].getHtml();
	}
	//ajout de la zone de saisi d'un nouveau commentaire
	coms += "<div id='new_com'><textarea id ='new_com_input' type='text' placeholder='Ecrivez un commentaire...'></textarea>"
	coms += "<input id='new_com_submit' type='submit' onclick='posterCommentaire("+JSON.stringify(m_id)+", $(\"#new_com_input\").val())' value='Poster'></div>";
	
	//ajouter le tout dans la div#messages_id.commentaires
	$("#message_"+m_id).find(".commentaires").html(coms);
	//changer le sens de la flèche
	$("#message_"+m_id).find(".show_comments").html("<i class='fa fa-sort-up' id='hide_comments'></i>")
	
}

function deleteMessage(id){	
	$.ajax({
		type: "GET",
		url: "message/deletem",
		data: "key="+env.key+"&id="+id,
		datatype: "JSON",
		success: function(resp){responseDelMessage(resp, id)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseDelMessage(resp, id){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		env.msgs[id] = null;
		//maj affichage
		var html = ""
		
		for(var i in env.msgs){
			if(env.msgs[i] != null)
				html = env.msgs[i].getHtml() + html
		}
		
		$("#messages_container").html(html)
	}
	else{
		alert(res.error)
	}
}

function deleteComment(idM, idC){
	$.ajax({
		type: "GET",
		url: "message/deletec",
		data: "key="+env.key+"&idM="+idM+"&idC="+idC,
		datatype: "JSON",
		success: function(resp){responseDelComment(resp, idM, idC)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseDelComment(resp, idM, idC){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		console.log(idC);
		console.log(env.msgs[idM].comments)
		// le supprimer de env
		
		// for(var i in env.msgs[idM].comments){
		// 	var tmp_c = env.msgs[idM].comments[i]
		// 	if(tmp_c != null && tmp_c.id == idC)
		// 		break;
		// }
		//supprimer le commentaire de env
		var coms = []
		for(var i=0; i<env.msgs[idM].comments.length; i++){
			if(env.msgs[idM].comments[i].id != idC){
				coms.push(env.msgs[idM].comments[i]);
			}
		}
		env.msgs[idM].comments = coms;
		console.log(env.msgs[idM].comments)
		//env.msgs[idM].comments[idC] = null;
		reloadMessage(res, idM)
	}
	else{
		alert(res.error)
	}
}