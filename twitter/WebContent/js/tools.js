
//fabtication d'une page html contenant selon le cas une page profile d'aun autre, mon profile ou une page d'accueil
//en fonction de env.fromId on adapte le contenu html et les fichier css importes
function makeMainPanel(fromId, fromLogin){
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
	env.fromId = fromId
	env.fromLogin = fromLogin
	//contenu de la page
	if(env.id != -1){
		if(fromId != -1 && fromId == env.id){
			//mon profile
			pageUser(env.id, env.login)
		}
		else if(fromId != -1){
			//autre profile
			//console.log("autre profile " +fromId+" "+fromLogin)
			pageUser(fromId, fromLogin)
		}
		else if(fromId == -1){
			//home page
			makeHomePanel()
		}
	}else{
		makeConnexionPanel()
	}
}

//charge dynamiquement un profile
function pageUser(id, login){	
	$.ajax({
		type: "GET",
		url: "user/info",
		data: "key="+env.key+"&id="+id,
		datatype: "JSON",
		success: function(resp){responsePageUser(resp, id)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})
}

function responsePageUser(resp, id){
	var res = JSON.parse(resp, revival)
	if(res.status == "OK"){
		var info = res.info
		var prenom = info.prenom
		var nom = info.nom
		var login = info.login
		var followers = info.followers
		var follows = info.followees
		// console.log(followers, follows);
		env.msgs = []

		prenom = prenom.charAt(0).toUpperCase() + prenom.slice(1)
		nom = nom.charAt(0).toUpperCase() + nom.slice(1)
		//fixed top nav bar
		var html = "<div class='navbar'><a id='home_m_btn' value='home' href='#' onclick='goHome()'>Home</a>"
		if(env.id != -1){
			//je suis connecte: afficher deconnexion
			html += "<a id='profil_m_btn' href='#' onclick='goProfile()'>Profile</a>"
			html += "<a id='login_m_btn' href='#' onclick='login()'>Logout</a>"
			html += "<form method='GET' action='javascript:(function(){return;})()' onsubmit='search()'>"
			html += "<div id='radio_div'>"
			html += "	<a id='radio'><input type='radio' name='radio' value='users' checked> 	Friends</a>"
			html += "	<a id='radio'><input type='radio' name='radio' value='posts'> Posts</a>"
			html += "</div>"
			html += "<input id='m_search_bar' placeholder='Rechercher...'/>"
			html += "</form></div>"
			
		}else{
			html += "<a id='login_m_btn' href='#' onclick='login()'>Login</a>"
		}

		
		//fin du header
		html += makeConnexionModal();
		html += "<div id='corps_page'><div id='profile_pres'>"
		html += "            <div id='profile_picture_div'>"
		html += "				<form> <input type='file' id='fileloader' onChange='readURL(this)'/></form>"
		html += "                <img id='profile_picture' src='./ressources/photo_de_profil.jpg' onclick='fileloader(\""+id+"\")'/>"
		html += "            </div>"
		html += "            <div id='profile_info' >"
		html += "                <a class='pres_text' id='pres_name'>"+prenom+" "+nom+"</a>"
		html += "                <a class='pres_text' id='pres_followers'>Followers: "+followers.length+"</a>"
		html += "                <a class='pres_text' id='pres_follows'>Follows: "+follows.length+"</a>"
		if(env.id != id){
			// console.log(followers.indexOf(env.id.toString()));
			
			if(followers.indexOf(env.id.toString()) != -1)
				html += "        <a id='follow_btn' href='#' onclick='unfollow("+id+", \""+login+"\")'>Unfollow</a>"
			else
				html += "        <a id='follow_btn' href='#' onclick='follow("+id+", \""+login+"\")'>Follow</a>"
		}
		
		html += "            </div> "
		html += "        </div>"
		
		html += "<div id='messages'>";

		//if co poster commentaire sur ma page ou celle de quelqu'un d'autre
		if(env.id != -1){
			html += "<div id='new_message'>"
			html += "  	<textarea id='new_message_input' type='text' placeholder='Ecrivez un nouveau message...'></textarea>"
			html += "	<input id='new_message_btn' type='submit' value='Poster' onclick='posterMessage("+id+", $(\"#new_message_input\").val())'>"
			html += "</div>"
		}
		
		html += "	<div id='messages_container'></div>"
		html += "</div>"
		html += "</div></div>";//fin div corps_page

		//recup tous les messages postés sur son profile
		$(completeMessages(id))
		//chargement de la page
		$('body').html(html);
	}
	else if(res.error == "timeout"){
			$(makeConnexionPanel)
	}else{
		alert(res.error);
	}
}
//charger la page generale
function makeHomePanel(){
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
	//fixed top nav bar
	var html = "<div class='navbar'><a id='home_m_btn' value='home' href='#' onclick='goHome()'>Home</a>"
	if(env.id != -1){
		//je suis connecte: afficher deconnexion
		html += "<a id='profil_m_btn' href='#' onclick='goProfile()'>Profile</a>"
		html += "<a id='login_m_btn' href='#' onclick='login()'>Logout</a>"
		html += "<form method='GET' action='javascript:(function(){return;})()' onsubmit='search()'>"
		html += "<div id='radio_div'>"
		html += "	<a id='radio'><input type='radio' name='radio' value='users' checked> 	Friends</a>"
		html += "	<a id='radio'><input type='radio' name='radio' value='posts'> Posts</a>"
		html += "</div>"
		html += "<input id='m_search_bar' placeholder='Rechercher...'/>"
		html += "</form></div>"
	}else{
		html += "<a id='login_m_btn' href='#' onclick='login()'>Login</a>"
	}

	//fin du header
	html += makeConnexionModal();
	html += "<div id='corps_page'>";
	html +=	"	<!-- zone de statistiques -->";
	html +=	"	<div id='stats'>";
	html += "		<div></div>"
	html += "	</div>";
	//si je suis connecte afficher une zone de saisi sinon rien du tout
	if(env.id!= -1){
		html += "<div id='messages'>";
		html += "	<div id='new_message'>"
		html += "   	<textarea id='new_message_input' type='text' placeholder='Ecrivez un nouveau message...'></textarea>"
		html += "		<input id='new_message_btn' type='submit' value='Poster' onclick='posterMessage("+env.id+", $(\"#new_message_input\").val())'>"
		html += "	</div>"
		html += "	<div id='messages_container'></div>"
		html += "</div>"
	}

	html += "</div>";//fin div corps_page

	//recup tous les messages
	$(completeMessages(-1))
	//chargement de la page
	$('body').html(html);
}

function makeConnexionModal(){
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
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
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
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
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
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

//make search result panel
function makeSearchResultPanel(usersHtml){
	//initialiser env.Skip pour recuper les messages en partant du premier
	env.skip = 0
	//fixed top nav bar
	// console.log(users);
	var html = "<div class='navbar'><a id='home_m_btn' value='home' href='#' onclick='goHome()'>Home</a>"
	if(env.id != -1){
		//je suis connecte: afficher deconnexion
		html += "<a id='profil_m_btn' href='#' onclick='goProfile()'>Profile</a>"
		html += "<a id='login_m_btn' href='#' onclick='login()'>Logout</a>"
		html += "<form method='GET' action='javascript:(function(){return;})()' onsubmit='search()'>"
		html += "<div id='radio_div'>"
		html += "	<a id='radio'><input type='radio' name='radio' value='users' checked> 	Friends</a>"
		html += "	<a id='radio'><input type='radio' name='radio' value='posts'> Posts</a>"
		html += "</div>"
		html += "<input id='m_search_bar' placeholder='Rechercher...'/>"
		html += "</form></div>"
	}else{
		html += "<a id='login_m_btn' href='#' onclick='login()'>Login</a>"
	}

	//fin du header
	html += makeConnexionModal();
	html += "<div id='corps_page'>";
	html +=	"	<!-- zone de statistiques -->";
	html +=	"	<div id='stats'>";
	html += "		<div></div>"
	html += "	</div>";
	//si je suis connecte afficher une zone de saisi sinon rien du tout
	if(env.id!= -1){
		html += "<div id='search_result'>";
		html += usersHtml
		html += "</div>"
	}

	html += "</div>";//fin div corps_page

	//chargement de la page
	$('body').html(html);
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
	env.msgs = []
	env.skip = 0;
	makeMainPanel(-1, env.login);
}

//profile
function goProfile(){
	env.msgs = []
	env.skip = 0;
	pageUser(env.id, env.login);
}


//gestion cookies
function createCookie(name, value, days){
	//init env.msgs
	env.msgs = []
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
function follow(id, login){	
	$.ajax({
		type: "GET",
		url: "friends/add",
		data: "key="+env.key+"&id_friend="+id,
		datatype: "JSON",
		success: function(resp){responseFollow(resp, id, login)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseFollow(resp, id, login){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		//recharger la page
		makeMainPanel(id,login)
	}
	else if(res.error == "timeout"){
		$(makeConnexionPanel);
	}
	else{
		alert(res.error)
	}
}

function unfollow(id, login){	
	$.ajax({
		type: "GET",
		url: "friends/remove",
		data: "key="+env.key+"&id_friend="+id,
		datatype: "JSON",
		success: function(resp){responseUnfollow(resp, id, login)},
		error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
	})	
}

function responseUnfollow(resp, id, login){
	var res = JSON.parse(resp, revival);
	if(res.status == "OK"){
		makeMainPanel(id,login)
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
		//console.log(env.follows);
		
	}else{
		alert(res.error)
	}
}


//lancer un recherche pour un utilisateur ou un message
function search(){
	//recup contenu de la recherche
	var query = $("#m_search_bar").val();
	
	
	var radio = $("input[name='radio']:checked").val();
	if(radio == "users" && query.length > 0){
		//search for users
		//ajax query
		$.ajax({
			type: "GET",
			url: "friends/search",
			data: "key="+env.key+"&query="+query,
			datatype: "JSON",
			success: function(resp){responseSearchUsers(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
		})	
	}
	else if(query.length > 0){
		//search for posts
		$.ajax({
			type: "GET",
			url: "message/search",
			data: "key="+env.key+"&text="+query,
			datatype: "JSON",
			success: function(resp){responseSearchPosts(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
		})	
	}	
}

function responseSearchUsers(resp){
	var res = JSON.parse(resp, revival)
	var html = ""
	
	if(res.status == "OK"){
		if(res.message == "found"){
			for(key in res.users){
				var user = res.users[key]
				html += userToHtml(user.id, user.login, user.nom, user.prenom)
			}
		}else{
			//aucun resultat trouve
			html += "<a id='notfound'>42</a>"
		}
		makeSearchResultPanel(html)
	}
	else{
		alert(res.message)
	}
}

function responseSearchPosts(resp){
	var res = JSON.parse(resp, revival)
	var messagesHtml = ""
	
	if(res.status == "OK"){
		if(res.message == "found"){
			var messages = res.messages
			env.msgs = []
			//trier en fonction du score
			keysSorted = Object.keys(messages).sort(function(a,b){return messages[b]-messages[a]})
			
			keysSorted.forEach(element => {
				var m =messages[element]
				//recup commentaires
				var coms = []
				for(var c in m.commentaires){
					var com = m.commentaires[c]
					coms.push(new Comment(com.id, m.id, com.auteur, com.text, com.date))				
				}
				var message = new Message(m.id, m.auteur, m.text, m.date, coms)
				env.msgs[message.id]=message			
				messagesHtml += message.getHtml()
				$("#messages").html(messagesHtml)
			});		
		}
		else{
			//aucun resultat trouve
			messagesHtml += "<a id='notfound'>42</a>"
		}
		makeSearchResultPanel(messagesHtml)
	}
	else{
		alert(res.message)
	}
}
//save profile picture
function fileloader(id){
	// console.log(id+" "+env.id)
	if(env.id == id)
		$("#fileloader").click()
}
function readURL(input) {
	if (input.files && input.files[0]) {
		//console.log($("#fileloader")[0].files[0])
		var formData = new FormData;
		formData.append("key", env.key);
		formData.append("file", $("#fileloader")[0].files[0]);
		//$('#profile_picture').attr('src', e.target.result);
		//console.log(e.target.result.length);
		//"key="+env.key+"&path="+$("#fileloader")[0].files[0]
		console.log("ok")
		$.ajax({
			enctype: "multipart/form-data",
			method: "POST",
			type: 'POST',
			url: "user/picture",
			data: formData/*"key="+env.key+"&file="+$("#fileloader")[0].files[0]*/,
			//datatype: 'json',
			//encode: true,
			processData: false,
			contentType: false,
			success: function(resp){responsePath(resp)},
			error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
		})
		// $.ajax({
		// 	type: "GET",
		// 	url: "user/picture",
		// 	data: "key="+env.key+"&path="+e.target.result.toString(),
		// 	datatype: "JSON",
		// 	success: function(resp){responsePath(resp)},
		// 	error: function(jqXHR, textStatus, errorThrown){alert(textStatus+" "+errorThrown);},
		// })	
	}
}

function responsePath(resp){
	var res = JSON.parse(resp, revival);
	
	if(res.status == "OK"){
		var path = res.path
		console.log(res.message)
		$('#profile_picture').attr('src', path)
	}else if(res.error == "timeout"){
		$(makeConnexionPanel);
	}
	else{
		alert(res.error)
	}
}