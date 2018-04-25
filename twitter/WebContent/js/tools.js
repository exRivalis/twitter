
//fabtication d'une page html contenant selon le cas une page profile d'aun autre, mon profile ou une page d'accueil
//en fonction de env.fromId on adapte le contenu html et les fichier css importes
function makeMainPanel(fromId, fromLogin){
	var html = "<div class='navbar'><a id='home_m_btn' value='home' href='#' onclick='goHome()'>Home</a>"
	
	if(env.id != -1){
		//je suis connecte: afficher deconnexion
		html += "<a id='profil_m_btn' href='#' onclick='goProfile()'>Profile</a>"
		html += "<a id='login_m_btn' href='#' onclick='login()'>Logout</a>"
		//si page profile de quelqu'und'autre afficher follow
		if(fromId == env.id){
			html += "<a id='follow_m_btn' href='#' onclick='gestionFollow("+fromId+")'>Follow</a>"
			// html += "<script type='text/javascript'> $('#follow_m_btn').click(function(){"+funcCall+";}) </script>"
			
		}
		
	}else{
		html += "<a id='login_m_btn' href='#' onclick='login()'>Login</a>"
	}

	html += "<input id='m_search_bar' placeholder='Rechercher...'/></div>"
	//fin du header
	//place au corps de la page
	html += makeConnexionModal();
	html += "<div id='corps_page'>";
	if(fromId < 0){
		//Home
		html +=	"<!-- zone de statistiques -->";
		html +=	"<div id='stats' class='rounded_div'>";
		html += "<div>stats</div>"
		html += "</div>";//fin div stats
		if(env.id!= -1){
			html += "<div id='messages'>";
			html += "	<div id='new_message'>"
			html += "   	<textarea id='new_message_input' type='text' placeholder='Ecrivez un nouveau message...'></textarea>"
			html += "		<input id='new_message_btn' type='submit' value='Poster' onclick='posterMessage($(\"#new_message_input\").val())'>"
			html += "	</div>"
			html += "	<div id='messages_container'>container</div>"
			html += "</div>"
		}
	}
	else if(fromId == env.id && env.id != -1){
		//mon profile
		// html += "<div>Mon profile</div>"
		html += "<div id='messages'>";
			html += "	<div id='new_message'>"
			html += "   	<textarea id='new_message_input' type='text' placeholder='Ecrivez un nouveau message...'></textarea>"
			html += "		<input id='new_message_btn' type='submit' value='Poster' onclick='posterMessage($(\"#new_message_input\").val())'>"
			html += "	</div>"
			html += "	<div id='messages_container'>container</div>"
			html += "</div>"

	}
	else if(fromId != env.id){
		//autre profile
		//TODO
		html += "<div>Autre profile</div>"
	}
	html += "</div>";//fin div corps_page

	//recup tous messages
	$(completeMessages())
	$('body').html(html);

}

function makeConnexionModal(){
	var html ="<div id='login_modal' class='modal'>"
		html +="	<div class='modal_content'>"
		html +="		<span class='close_btn' onclick='closeLoginModal()'>&times;</span>"
		html +="		<form id='login_form' method='get' action='javascript:(function(){return;})()' onSubmit='javascript:connexion(this)'>"					
		html +="			<input id='login_input' class='modal_input' type='text' placeholder='Login' name='login'>"
		html +="			<input id='psw_input' class='modal_input' type='password' placeholder='Mot de passe' name='psw'>"

		html +="			<input id='login_btn' class='modal_btn' type='submit' value='Se connecter'>"
		html +="			<a id='modal_link' class='link' href='#' onclick='makeRegisterPanel()'>Pas encore inscrit?</a>"
		html +="		</form>"
		html +="	</div>"
		html +="</div>"
		return html
}

//ferme le modal de connexion
function closeLoginModal(){
	login_modal.style.display = 'none';
}
function makeConnexionPanel(){
	var html = ""
	html += "<form id='login_form' class='insc_form' method='GET' action='javascript:(function(){return;})()' onSubmit='javascript:connexion(this)'>"
	html += "	<div id='modal_top'>"
	html += "		<span id='modal_co_btn' class='modal_span'><a class='modal_top_btn' style='color:#0F9295'>Connexion</a></span>"
	html += "		<span id='modal_reg_btn' class='modal_span' onclick='javascript:makeRegisterPanel()'><a class='modal_top_btn'>Inscription</a></span>"
	html += "	</div>"
	html += "<hr/>"
	html += "	<input id='login_input' class='modal_input' type='text' name='login' placeholder='Login'>"
	html += "	<input id='psw_input' class='modal_input' type='password' name='psw' placeholder='Mot de Passe'>"
	html += "   <div id='modal_btn_div'>"
	html += "		<input id='co_btn' class = 'insc_button' type='submit' value='Se connecter' >"
	html += "		<a id='insc_co' onclick='makeConnexionPanel()' type='submit' value='Vous avez déjà un compte?'</a>"
	html += "   </div>"
	html += "</form>"
	
	$('body').html(html);
}
function makeRegisterPanel(){
	var html = ""
	html += "<form class='insc_form' method='GET' action='javascript:(function(){return;})()' onSubmit='javascript:inscription(this)'>"
	html += "	<div id='modal_top'>"
	html += "		<span id='modal_co_btn' class='modal_span' onclick='javascript:makeConnexionPanel()'><a class='modal_top_btn'>Connexion</a></span>"
	html += "		<span id='modal_reg_btn' class='modal_span'><a class='modal_top_btn' style='color:#0F9295'>Inscription</a></span>"
	html += "	</div>"
	html += "<hr/>"
	html += "	<input class='modal_input' type='text' name='prenom' placeholder='Prénom'>"
	html += "	<input class='modal_input' type='text' name='nom' placeholder='Nom'>"
	html += "	<input class='modal_input' type='text' name='login' placeholder='Login'>"
	// html += "	<input class='modal_input' type='text' name='email' placeholder='Email'>"
	html += "	<input class='modal_input' type='password' name='mdp' placeholder='Mot de Passe'>"
	html += "	<input class='modal_input' type='password' name='remdp' placeholder='Retapez votre Mot de Passe'>"
	html += "   <div id='modal_btn_div'>"
	html += "		<input id='register_btn' class = 'insc_button' type='submit' value='Valider' >"
	html += "		<a id='insc_co' onclick='makeConnexionPanel()' type='submit' value='Vous avez déjà un compte?'</a>"
	html += "   </div>"
	html += "</form>"
	
	$('body').html(html);
}
//charge dynamiquement une autre page html
function pageUser(id, login){
	makeMainPanel(id, login, env.query);
}

//permet de parser un JSON text en objet javascript: JSON.parse(json_text, revival)
function revival(key, value){
	//selon la valeur de key c'est un message, un commentaire ou autre chose
	if(key == "commentaire"){
		//verif les champs de value ne sont pas null
		if(value.id != undefined && value.auteur != undefined && value.texte != undefined && value.date != undefined){
			return new Comments(value.id, value.auteur, value.texte, value.date);
		}
	}
	else if(key == "message"){
		if(value.id != undefined && value.auteur != undefined && value.texte != undefined && value.date != undefined){
			return new Message(value.id, value.auteur, value.texte, value.date, value.comments);
		}
	}
	else if(key == "date"){
		if(value.jour != undefined, value.mois != undefined, value.annee != undefined, value.heure != undefined, value.minutes != undefined){
			//TODO verifier validite
			return new Date(''+value.annee+'-'+value.mois+'-0'+value.jour+'-'+value.heure+'-'+value.minutes);
		}
	}
	//dans le cas d'une erreur
	return (key,value);
}


//interaction with navbar login/logout button
function login(){
	var val = $('#login_m_btn').html()
	if (val == 'Login') {
		login_modal.style.display = "block";
	}
	else if(val == 'Logout'){	
		//appel logout dans connexion.js
		logout(env.key);
	}
}

//home
function goHome(){
	makeMainPanel(-1, env.login);
}

//profile
function goProfile(){
	makeMainPanel(env.id, env.login);
}


//gestion cookies
function createCookie(name, value, days){
	if(days){
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*100));
		var expires = "; expires=Date.toGMTString()";
	}
	else var expires = "";
	document.cookie = name+"="+JSON.stringify(value)+expires+"; ";
}

function readCookie(name){
	var nameEQ = name +"=";
	var cookies = document.cookie.split(";");
	var res = ""
	for(var i =0; i<cookies.length; i++){
		var c = cookies[i];
		
		while(c.charAt(0) == ' ') c = c.substring(1, c.length); //decalage d'une case dans le chaine de caractere
		if( c.indexOf(nameEQ) == 0){
			res = c.substring(nameEQ.length, c.length);
			return JSON.parse(res); //verif si c est sous-chaine de nameEQ
		} 
	}
	return null;//le cookie recherche n'existe pas
}

function eraseCookie(name){
	createCookie(name, null, -1);
}

//follow a user from his profile
function gestionFollow(id){
	var content = $("#follow_m_btn").html()
	if(conttent == "Follow"){
		follow(id)
	}else{
		unfollow(id)
	}
	
}
function follow(id){	
	$.ajax({
		type: "GET",
		url: "friends/add",
		data: "key="+env.key+"&id_friend="+id,
		datatype: "JSON",
		success: function(resp){responseFollow(resp, id)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseFollow(resp, id){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		
	}
	else{
		alert(res.error)
	}
}

function unfollow(id){	
	$.ajax({
		type: "GET",
		url: "friends/remove",
		data: "key="+env.key+"&id_friend="+id,
		datatype: "JSON",
		success: function(resp){responseUnfollow(resp, id)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseUnfollow(resp, id){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		
	}
	else{
		alert(res.error)
	}
}

//recup mes follows/friends
function getFriends(){
	if(env.key != -1){
		$.ajax({
			type: "GET",
			url: "friends/listfriends",
			data: "key="+env.key,
			datatype: "JSON",
			success: function(resp){responseFriends(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
		})
	}
	else{
		env.follows = []
	}
}

function responseFriends(resp){
	var res = JSON.parse(resp, revival)
	if(res.status == "OK"){
		for(friend in res.friends)
			env.follows[friend]=(res.friends[friend]);
		console.log(env.follows);
		
	}else{
		alrts(res.error)
	}
}