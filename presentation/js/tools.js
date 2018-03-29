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
	html += "<div class='info_message'> <span class='auteur_message'> Posté par " + this.auteur.login + "</span>
		<span class='date_message'> le " + this.date + "</span> </div>";

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
	setVirtualMessages();
}

//generation de données pour le travail hors ligne
function setVirtualMessages(){
	localdb = [];
	follows = [];
	var user1 = {"id": 1; "login":"jwayne"};
	var user2 = {"id": 2; "login":"bwyane"};
	var user3 = {"id": 3; "login":"joker"};
	var user4 = {"id": 4; "login":"le_che_pa"};

	//followers
	follows[1] = new set();
	follows[1].add(2); follows[1].add(3);
	follows[2] = new set();
	follows[2].add(1); follows[2].add(4);

	//messages
	var comm1 = new Comment(456, 1, "Le monde va bien!", new Date('2018-03-23'));
	var comm2 = new Comment(466, 3, "C'etait mieux avant!", new Date('2018-03-23'));
	var comm3 = new Comment(456, 1, "Non, le rap c'est mieux!", new Date('2018-03-23'));

	var localdb[2] = new Message(111, user2, "Waouh,je suis chaud xO", new Date('2018-03-20'), [comm1, comm2, comm3]);
	var localdb[1] = new Message(112, user1, "Moi aussi j'ai froid", new Date('2018-03-19'), [comm3, comm1, comm3]);
}


//fabtication d'une page html contenant selon le cas une page profile d'aun autre, mon profile ou une page d'accueil
//en fonction de env.fromId on adapte le contenu html et les fichier css importes
function makeMainPanel(){
	var html = "<header id='top'> <div id='logo'><img src='../ressources/logo_twitterium.png' width=70px/> </div>";
	html += "<div id='z_recherche'><form ><label for='search_bar' >Recherche</label><br>";
	html+="<input class='text_input' type='text' id='search_bar'><input type='checkbox' id='in_friends'>";
	html+="<input type='submit' class='button' id='search_btn' value='Recherche'></form></div>";
	html+="<div id='logout'><img id='logout_btn' src='../ressources/logout.png'></div></div>";
	//fin du header
	//place au corps de la page

	if(env.fromId < 0){
		//Home
		html+="<div id='title'>Home</div>";
	}
	else if(env.fromId == env.id){
		//mon profile
		//TODO
	}
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
