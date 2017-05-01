function users(id, nom, prenom, pseudo, mdp){
	this.nom = nom;
	this.prenom = prenom;
	this.pseudo = pseudo;
	this.mdp = mdp;
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