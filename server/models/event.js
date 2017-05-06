var eventList= {};

function Event(id, titre, description, lieu) {
  this.id = id;
  this.titre = titre;
  this.description = description;
  this.lieu = lieu;
  this.slot = [];
  
  this.update = function(titre, description, lieu){
    this.titre = titre;
    this.description = description;
    this.lieu = lieu;
  }
  
  this.addSlot = function(Slot){
    this.slot.push(Slot);
  }

  this.removeSlot = function(User){
    // TODO : SUPPRIMER UN CRENEAU D'UN EVENEMENT
  }

  this.updateSlot = function(User){
    // TODO : MODIFIER UN CRENEAU D'UN EVENEMENT
  }
  
}

var createEvent = function(titre, description, lieu) {
  var id = shortid.generate();
  if (typeof eventList[id] != 'undefined'){
    return 0;
  }
  eventList[id] = new Event(id, titre, description, lieu);
  return 1;
}

var updateEvent = function(id, titre, description, lieu){
  if (typeof eventList[id] === 'undefined'){
    return 0;
  }
  eventList[id].update(titre, description, lieu);
  return 1;
}

var deleteEvent = function(id){
  if (typeof eventList[id] === 'undefined'){
    return 0;
  }
  delete eventList[id];
  return 1;
}

var getEvent = function(id){
  return eventList[id];
}

var getAllEvents = function(){
  return eventList;
}

var addSlotToEvent = function(id, date){
  if (typeof eventList[id] === 'undefined'){
    return 0;
  }
  var c = slot.createSlot(date);
  eventList[id].addSlot(c);
  return 1;
}


// les 4 fonctions exportées
exports.createEvent = createEvent;
exports.updateEvent = updateEvent;
exports.deleteEvent = deleteEvent;
exports.getEvent = getEvent;
exports.getAllEvents = getAllEvents;
exports.addSlotToEvent = addSlotToEvent;
