var listeInscrits = {};
var listeEvents = {};

function Evenement(id, desc, date){
	this.desc = desc;
	this.date = new Date(date);
	//this.heure = 
	this.participants = 0;
	this.state = new State();
	this.addUser = function(){
		this.participants++;
	}

	this.remUser = function(){
		this.participants--;
	}

}

function State(){
	const NOUVEAU = "nouveau";
	const PLANIFIE = "planifié";
	const OUVERT = "ouvert";
	const CLOTURE = "cloturé";
	const FINI = "fini";
	const ANNULE = "annulé";
	this.etat = "nouveau";

	this.avancer(){
		switch(this.etat){
			case NOUVEAU:
				this.etat = PLANIFIE;
				break;
			case PLANIFIE:
				this.etat = OUVERT;
				break;
			case OUVERT:
				this.etat = CLOTURE;
				break;
			case CLOTURE:
				this.etat = FINI;
				break;
		}
	}

	this.cancel(){
		this.etat = ANNULE;
	}

	this.setAvancee(state){
		this.etat = state;
	}

	this.getAvancee(){
		return this.etat;
	}

}

var newEvent = function(id, desc, date){
	if (typeof listeEvents[id] === 'undefined') {
		listeEvents[id] = new Evenement(id, desc, date);
		return 1;
    }
    return 0;
}

/*var remEvent = function(id){
	if(typeof listeEvents[id] != 'undefined'){
		listeEvents[id] = null;
		return 1;
	}
	return 0;
}*/

var inscEvent = function(idEvent, idInsc, nomInsc, prenomInsc){
	if(typeof listeInscrits[id] === 'undefined'){
		this.listeInscrits[id] = ""+idEvent+" "+nomInsc + " " + prenomInsc;	
	}
	
}

var getDate = function(){
	return this.date;
}

var modificationEvent = function(id, desc, date){
	this.listeEvents[id] = new Evenement(id, desc, date);
}