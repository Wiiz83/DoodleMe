var slotList= {};

function Slot(id, eventId, date, comment) {
  this.id = id;
  this.eventId = eventId; 
  this.date = date;
  this.comment = comment;
  this.answers = {};
  
  this.addAnswer = function(User){
     // TODO : AJOUTER UNE REPONSE D'UN PARTICIPANT A UN CRENEAU
  }

  this.removeAnswer = function(User){
    // TODO : SUPPRIMER UNE REPONSE D'UN PARTICIPANT A UN CRENEAU
  }

  this.updateAnswer = function(User){
    // TODO : MODIFIER UNE REPONSE D'UN PARTICIPANT A UN CRENEAU
  }
  
  this.update = function(date, comment){
    this.date = date;
    this.comment = comment;
  }
}

var createSlot = function(date) { 
  var id = shortid.generate();
  var creneau = new Creneau(id, date);
  slotList[id] = creneau;
  return creneau;
};


var updateSlot = function(id, date, comment){
  if (typeof slotList[id] === 'undefined'){
    return 0;
  } else {
    slotList[id].update(date, comment);
    return 1;
  }
}

var deleteSlot = function(id){
  if (typeof slotList[id] === 'undefined'){
    return 0;
  } else {
    delete slotList[id];
    return 1;
  }
}

exports.createCreneau = createCreneau;
