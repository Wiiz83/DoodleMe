function eventAnswer(idEvent, idUser, eventAns){
	this.idEvent = idEvent;
	this.idUser = idUser;
	this.eventAns = eventAns;
}

var changeAnswer = function(newAnswer){
	this.eventAnswer = newAnswer;
}

