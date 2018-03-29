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
	var html = "<div class='texte_message'>" + this.texte + "</div>";
	//ecriture contenu du message et infos
	html += "<div class='info_message'> <span class='auteur_message'> Posté par " + this.auteur.login + "</span><span class='date_message'> le " + this.date + "</span> </div>";

	//ecriture des commentaires
	//TODO refaire plus tard
	html += "<div class='comments_message'>" + this.comments + " </div>"

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
	env.fromId = -1;
	env.id = 4;
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

	localdb[2] = new Message(111, user2, "Waouh,je suis chaud xO", new Date('2018-03-20'), [comm1, comm2, comm3]);
	localdb[1] = new Message(112, user1, "Moi aussi j'ai froid", new Date('2018-03-19'), [comm3, comm1, comm3]);
}


//fabtication d'une page html contenant selon le cas une page profile d'aun autre, mon profile ou une page d'accueil
//en fonction de env.fromId on adapte le contenu html et les fichier css importes
function makeMainPanel(){

	var html = "<header class='rounded_div' id='top'> <div id='logo'><img src='../ressources/logo_twitterium.png' width=70px/> </div>";
	html += "<div id='z_recherche'><form ><label for='search_bar' >Recherche</label><br>";
	html+="<input class='text_input' type='text' id='search_bar'/><input type='checkbox' id='in_friends'/>";
	html+="<input type='submit' class='button' id='search_btn' value='Recherche'></form></div>";
	html+="<div id='log'>";
	if(env.fromId == env.id){
		//my profile
		html += "<div id='title'> Mon profile </div>";
	}
	else if(env.fromId > 0 && env.fromId != env.id){
		html += "<div id='title'> Profile de jkjkh	<div id='follow'><img src='../ressources/plus.png'></div></div>"
	}
	html += "<div id='login'><a class='link' href='./main.html'>Connexion</a></div></div></div>";
	//fin du header
	//place au corps de la page

	if(env.fromId < 0){
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
		html += "<input type='submit' class='button' id='post_btn' value='Poster'>";
		html += "</div></div>";
		html += "<div id='messages' class='rounded_div'>";
		html += "<div>messages</div><div class='message'>le contenu du message</div>";
		html += "<div class='info_message'>";
		html += "<span ...>posté par machin le machin</span>";
		html += "</div><div class='message'>";
		html += "<div id='nom'><div>Nom</div></div>"
		html += "<div id='prenom'><div>Prenom</div></div><div id='contenu_message'><div>Contenu</div></div>";
		html +=	"</div><div class='message'><div id='nom'><div>Nom</div></div>";
		html += "<div id='prenom'><div>Prenom</div></div>";
		html += "<div id='contenu_message'><div>Contenu</div></div></div></div></div>";
		html += "</div>";

	}
	else if(env.fromId == env.id){
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


	// html += "</body></html>";
	// return html;
	$('body').html(html);
	// alert(html);
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
