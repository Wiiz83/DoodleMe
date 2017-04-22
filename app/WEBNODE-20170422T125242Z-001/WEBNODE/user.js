var listeUsers = {};

function utilisateur(id, nom, prenom, pseudo, mdp){
	this.nom = nom;
	this.prenom = prenom;
	this.pseudo = pseudo;
	this.mdp = mdp;
}

var newUser = function(id, nom, prenom){
	if (typeof listeUsers[id] != 'undefined') {
		listeUsers[id] = new utilisateur(id, desc, date);
		return 1;
    }
    return 0;
}

var getNom = function(id){
	if (typeof listeUsers[id] != 'undefined'){
		return listeUsers[id].nom;
	}
}

var getPrenom = function(id){
	if (typeof listeUsers[id] != 'undefined'){
		return listeUsers[id].prenom;
	}
}

var uConnect = function(pseudo, mdp){
	var found = 0;
	var idUser;
	for (var u in listeUsers){
		if(u.pseudo == pseudo && u.mdp == mdp){
			found = 1;
			idUser = u.id;
			break;
		}
	}
	if(found){
		return listeUsers[idUser];
	}
}

