//un message
function Message(id,auteur, texte, date, comments){
	this.id = id;
	this.auteur = auteur;
	this.texte = texte;
	this.date = date;
	if(comments == undefined)
		comments = []
	this.comments = comments;
}
//renvoie le messaage sous format html interpretable durectement par le navigateur
Message.prototype.getHtml = function(){
	//var html = "<div class='texte_message'>" + this.texte + "</div>";
	//ecriture contenu du message et infos
	html += "<div class='info_message'> <span class='auteur_message'> Posté par " + this.auteur.login + "</span><span class='date_message'> le " + this.date + "</span> </div>";

	var html = "<div class='message' id='message_"+this.id+"'><div class='texte_message'>" + this.texte + "</div>";
	html += "<span id='show_comments'><input onclick='developpeMessage("+this.id+")' type='image' src='../ressources/show.png'/></span>";
	html += "<div class='info_message'><span class='auteur_message'>Posté par "+ this.auteur.login +"</span>";
	html += "<span class='date_message'> le " + this.date.getDate()+"/"+this.date.getMonth()+ "/"+this.date.getYear()+"</span></div>"
	// "/"+" à "+ this.date.getHours() +":"+this.date.getMinutes() +
	html += "<div class='comments_message'>";

	//ecriture des commentaires
	//TODO

	html += "</div><hr class='line'></div>";

	return html;
}

//commentaire
function Comment(id, auteur, texte, date){
	this.id = id;
	this.auteur = auteur;
	this.texte = texte;
	this.date = date;
}
//renvoie le commentaire sous format html interpretable durectement par le navigateur
Comment.prototype.getHtml = function(){
	var html = "<div class='texte_comment'>" + this.texte + "</div>";
	//ecriture contenu du commentaire, auteur, date
	html += "<div class='info_comment'> <span class='auteur_comment'> Posté par " +
	this.auteur.login + "</span><span class='date_comment'> le " + this.date + "</span> </div>";
	return html;
}

//init: initialise l'environnement de la page pour le travail hors ligne
function init(){
	noConnection = false;
	env = new Object();
	env.noConnection = true
	env.fromId = -1;
	env.id = -1;
	env.msg = [];
	setVirtualMessages();
}

//generation de données pour le travail hors ligne
function setVirtualMessages(){
	localdb = [];
	follows = [];
	var user1 = {"id": 1, "login":"jwayne"};
	var user2 = {"id": 2, "login":"bwyane"};
	var user3 = {"id": 3, "login":"joker"};
	var user4 = {"id": 4, "login":"le_che_pa"};

	//followers
	follows[1] = new Set();
	follows[1].add(2); follows[1].add(3);
	follows[2] = new Set();
	follows[2].add(1); follows[2].add(4);

	//messages
	var comm1 = new Comment(456, 1, "Le monde va bien!", new Date('2018-03-23'));
	var comm2 = new Comment(466, 3, "C'etait mieux avant!", new Date('2018-03-23'));
	var comm3 = new Comment(456, 1, "Non, le rap c'est mieux!", new Date('2018-03-23'));

	localdb[0] = new Message(111, user2, "Waouh,je suis chaud xO", new Date('2018-03-20'), [comm1, comm2, comm3]);
	localdb[1] = new Message(112, user1, "Moi aussi j'ai froid", new Date('2018-03-19'), [comm3, comm1, comm3]);
	localdb[2] = new Message(145, user1, "Moi aussi j'ai froid", new Date('2018-03-19'), [comm3, comm1, comm3]);
}


//fabtication d'une page html contenant selon le cas une page profile d'aun autre, mon profile ou une page d'accueil
//en fonction de env.fromId on adapte le contenu html et les fichier css importes
function makeMainPanel(fromId, fromLogin){

	var html = "<header class='rounded_div' id='top'> <div id='logo'><img src='../ressources/logo_twitterium.png' width=70px/> </div>";
	html += "<div id='z_recherche'><form ><label for='search_bar' >Recherche</label><br>";
	html+="<input class='text_input' type='text' id='search_bar'/><input type='checkbox' id='in_friends'/>";
	html+="<input type='submit' class='button' id='search_btn' value='Recherche'></form></div>";
	html+="<div id='log'>";
	if(fromId == env.id && env.id != -1){
		//je suis connecte: afficher deconnexion
		//my profile
		html += "<div id='title'> Mon profile </div>";
		html += "<div id='login'><a onclick='makeConnexionPanel()'>Connexion</a></div></div></div>"
	}
	else if(fromId > 0 && fromId != env.id){
		//je suis connecte: afficher deconnexion
		html += "<div id='title'> Profile de jkjkh	<div id='follow'><img src='../ressources/plus.png'></div></div>"
		html += "<div id='login'><a onclick='makeConnexionPanel()'>Connexion</a></div></div></div>"
	}
	else{
		//je ne suis pas connecte
		html += "<div id='login'><input id='login_btn' onclick='makeConnexionPanel()' type='submit' value='connexion'/></div></div></div></header>"
	}

	//fin du header
	//place au corps de la page

	if(fromId < 0){
		//Home
		// html+="<div id='title'>Home</div>";
		html += "<div id='corps_page'>";
		html +=	"<!-- zone de statistiques -->";
		html +=	"<div id='stats' class='rounded_div'>";
		html += "<div>stats</div></div>";
		html += "<!-- nouveau message & liste messages -->";
		html +=	"<div id='corps_messages'>";
		html += "<div id='new_message' class='rounded_div'>";
		html += "<div>Nouveau message</div>";
		html += "<input class='text_input' type='text' id='new_message_input'>";
		html += "<div id=new_message_btn>";
		html += "<input onclick='' type='submit' class='button' id='post_btn' value='Poster'>";
		html += "</div></div>";
		html += "<div id='messages' class='rounded_div'>";
		html += "<div>messages</div>"
		html += "<div id='messages_container'></div>"
		html += "</div></div>";
		html += "</div>";

	}
	else if(fromId == env.id){
		//mon profile
		//TODO

	}
	else{
		//profile de quelqu'un d'autre
		//TODO
		html += "	<div class='banniere'><img src='../ressources/banniere_twitterium.jpg' name='banniere' class='banniere'>";
		html += "</div><div class='middle'>";
		html += "<img src='../ressources/photo_de_profil.jpg' name='photo_de_profil' class='photo_de_profil' width='150' height='150'></div>";
		html += "<div id='corps_page'><!-- zone de statistiques --><div id='friends' class='rounded_div'>";
		html += "<div>Amis</div></div><!-- nouveau message & liste messages --><div id='corps_messages'>";
		html +=	"<div id='new_message' class='rounded_div'><div>Nouveau message</div>";
		html += "<input class='text_input' type='text' id='new_message_input'><div id=new_message_btn>";
		html += "<input type='submit' class='button' id='post_btn' value='Poster'></div></div>";
		html += "<div id='messages' class='rounded_div'></div><div id='suggestions' class='rounded_div'>";
		html += "<div>Suggestions</div></div></div>";
	}
	$('body').html(html);

}

function makeConnexionPanel(){
	var html = "<div id='co_central'><form class='rounded' method='get'><div id='co_upper_div'>";
	html += "<div id='co_text_div'>"
	html += "<div class='co_span_text'>Login</div>";
	html += "<div class='co_span_text'>Mot de passe</div></div>";
	html += "<div id='co_input_div'>"
	html += "<div><input class='co_text_input' type='text' name='login'></div>";
	html += "<div><input class='co_text_input' type='password' name='psw'></div></div></div>";
	html +=	"<div id='co_lower_div'><span><input class='button' type='submit' value='Connexion'></span>";
	html += "<span class='co_span_link'><input id='insc_btn' onclick='makeRegisterPanel()' type='submit' value='Pas encore inscrit?'/></span>";
	// html += "<div id='login'><input id='login_btn' onclick='makeConnexionPanel()' type='submit' value='connexion'/></div></div></div>"
	html += "</div></form></div>";

	$('body').html(html);
}

function makeRegisterPanel(){
	html = "<h1 id='insc_h1'> Inscription </h1><div id='insc_central'>"
	html += "<form class='insc_rounded' method='get'>"
	html += "<div id='insc_input_div'>"
	html += "<div class='span_text'><input class='insc_text_input' type='text' name='Prenom' placeholder='Prénom'></div>"
	html += "<div class='span_text'><input class='insc_text_input' type='text' name='Nom' placeholder='Nom'></div>"
	html += "<div class='span_text'><input class='insc_text_input' type='text' name='Login' placeholder='Login'></div>"
	html += "<div class='span_text'><input class='insc_text_input' type='text' name='Email' placeholder='Email'></div>"
	html += "<div class='span_text'><input class='insc_text_input' type='password' name='Mot de Passe' placeholder='Mot de Passe'></div>"
	html += "<div class='span_text'><input class='insc_text_input' type='password' name='Retapez Mot de Passe' placeholder='Retapez votre Mot de Passe'></div>"
	html += "</div></form></div></br></br>"
	html += "<div id = 'insc_lower_div'><div id='insc_btn_div'>"
	html += "<input id='insc_register_btn' class = 'button' type='submit' value='Enregitrer' >"
	html += "<input id='insc_cancel_btn' class = 'button' type='submit' value='Annuler' ></div>"
	html += "<div id='insc_link_div'><input id='insc_btn' onclick='makeConnexionPanel()' type='submit' value='Vous avez déjà un compte?'/></div></div>"

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
	return value;
}

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
