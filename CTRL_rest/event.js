function events(id, desc, date){
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

/*var remEvent = function(id){
	if(typeof listeEvents[id] != 'undefined'){
		listeEvents[id] = null;
		return 1;
	}
	return 0;
}*/


var getDate = function(){
	return this.date;
}
