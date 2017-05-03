function eventSlots(idSlots, eventId, eventDate){
	this.idSlots = idSlots;
	this.eventId = eventId;
	this.eventDate = eventDate;
}

var getId = function(){
	return this.idSlots;
}

var getEventId = function(){
	return this.eventId;
}

var getEventDate = function(){
	return this.eventDate;
}