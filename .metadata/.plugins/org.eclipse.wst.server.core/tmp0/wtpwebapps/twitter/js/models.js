//un message
function Message(id, auteur, texte, date, comments){
	this.id = id;
	this.auteur = auteur;
	this.texte = texte;
	this.date = date;
	if(comments == undefined)
		this.comments = [];
	else
		this.comments = comments;
}
//renvoie le messaage sous format html interpretable durectement par le navigateur
Message.prototype.getHtml = function(){
	var html="<div class='message'  id='message_"+this.id+"'>"
	html += "	<span id='delete_m' onclick='deleteMessage("+this.id+")'>&times;</span>"
	html += "	<div class='corps_message'>"
	html += "   	<div class='text_message'>"+this.texte+"</div>"	
	html += "		<div class='info_message'>" 
	html += "			<span class='auteur_message'>par " + this.auteur + "</span>"
	html += "			<span class='date_message'> le " + this.date + "</span>"
	html += "		</div>"
	html += "	</div>"	
	html += "	<div class='commentaires'></div>"
	html += "	<div class='show_hide'>"
	html += "	   <div class='show_comments' onclick='javascript:developpeMessage("+ JSON.stringify(this.id) +")'>"
	html += "			<i class='fa fa-sort-down' id='developpe_comments'></i>"
	html += "		</div>"
	html += "	</div>"
	html += " </div>"
	// var html = "<div class='message' id='message_"+this.id+"'><div class='texte_message'>" + this.texte + "</div>";
	// html += "<span id='show_comments'><input onclick='developpeMessage("+this.id+")' type='image' src='../ressources/show.png'/></span>";
	// html += "<div class='info_message'><span class='auteur_message'>Posté par "+ this.auteur.login +"</span>";
	// html += "<span class='date_message'> le " + this.date.getDate()+"/"+this.date.getMonth()+ "/"+this.date.getYear()+"</span></div>"
	// // "/"+" à "+ this.date.getHours() +":"+this.date.getMinutes() +
	// html += "<div class='comments_message'>";

	// //ecriture des commentaires
	// //TODO

	// html += "</div><hr class='line'></div>";

	return html;
}



//commentaire
function Comment(id, idm, auteur, texte, date){
	this.id = id;
	this.idm = idm;
	this.auteur = auteur;
	this.texte = texte;
	this.date = date;
}
//renvoie le commentaire sous format html interpretable durectement par le navigateur
Comment.prototype.getHtml = function(){
	var html ="<div class='commentaire'>"
	html += "	<span id='delete_c' onclick='deleteComment("+this.idm+","+this.id+")'>&times;</span>"
	html += "<div class='texte_comment'>" + this.texte + "</div>";
	//ecriture contenu du commentaire, auteur, date
	html += "<div class='info_message'><span class='auteur_message'> par " +
	this.auteur + "</span><span class='date_message'> le " + this.date + "</span> </div>";
	html +="</div>"
	return html;
}

// function User(id, login, nom, prenom){
// 	this.id = id;
// 	this.login = login
// 	this.nom = nom.charAt(0).toUpperCase() + nom.splice(1);
// 	this.prenom = prenom.charAt(0).toUpperCase() + prenom.splice(1);
// }

// User.prototype.getHtml = function(){
// 	var html = "<div class='user'>"
// 	html +=	"		<div class='user_picture'>"
// 	html +=	"			<img class='profile_picture' src='../ressources/photo_de_profil.jpg'/>"
// 	html +=	"		</div>"
// 	html +=	"		<div class='user_info'>"
// 	html +=	"			<span class='user_name'>"+this.prenom +" "+ this.nom+"</span>"
// 	html +=	"		</div>"
// 	html +=	"	</div>"
// 	return html
// }

function userToHtml(id, login, nom, prenom){
	// nom = nom.charAt(0).toUpperCase() + nom.splice(1);
	// prenom = prenom.charAt(0).toUpperCase() + prenom.splice(1);
	var html = "<div class='user'>"
	html +=	"		<div class='user_picture'>"
	html +=	"			<img class='search_picture' src='./ressources/photo_de_profil.jpg'/>"
	html +=	"		</div>"
	html +=	"		<div class='user_info'>"
	html +=	"			<span class='user_name'>"+prenom +" "+ nom+"</span>"
	html +=	"		</div>"
	html +=	"	</div>"
	return html
}
//init: initialise l'environnement de la page pour le travail hors ligne
function init(){
	noConnection = false;
	env = new Object();
	env.noConnection = false;
	env.id = -1;
	env.login = -1;
	env.msgs = [];
	env.idMin = -1;
	env.idMax = -1;
	env.nbMax = -1;
	env.key = -1;
	env.follows = []
	// setVirtualMessages();
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

