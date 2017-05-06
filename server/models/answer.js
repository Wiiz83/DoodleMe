var answerList= {};

function Answer(userId, eventId, answer) {
  this.userId = userId;
  this.eventId = eventId; 
  this.answer = answer;

  this.update = function(answer){
    this.answer = answer;
  }
}

// TODO : delete, update, ajout
