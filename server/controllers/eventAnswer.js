 /*
var express = require('express');
var app = express.Router();
var server = require('http').Server(app);
var bodyParser = require('body-parser');


connection.connect(function(err) {
  if (err) throw err;
});


function eventAnswer(idEvent, idUser, eventAns){
	this.idEvent = idEvent;
	this.idUser = idUser;
	this.eventAns = eventAns;
}

var changeAnswer = function(newAnswer){
	this.eventAnswer = newAnswer;
}

app.get('/eventAnswer/:id', function (req, res) {
    if(typeof req.params.userID === 'undefined' || typeof req.params.EventSlotID === 'undefined' || typeof req.params.isAvalaible === 'undefined') {
        res.status(400).json({ error: 'Réponse non trouvé' });
    }else if(connection.query('SELECT * FROM EventAnswer WHERE userID = 'req.body.userID' AND EventSlotID='req.body.EventSlotID';') != 'undefined'){
        res.json(connection.query('SELECT * FROM EventAnswer WHERE userID = 'req.body.userID' AND EventSlotID='req.body.EventSlotID';'));
    }else{
        res.status(400).json({error: 'Erreur lors de la récupération de l\'évènement'});
    }
})

app.post('/eventAnswer/', function (req, res){
    if(typeof req.body.EventSlotID === 'undefined' || typeof req.params.isAvalaible === 'undefined'){
        res.status(400).json({error: 'Réponse non enregistré'});
    }else{
        res.json(connection.query('INSERT INTO EventAnswer(userID, EventSlotID, isAvalaible) VALUES ('req.body.userID', 'req.body.EventSlotID', 'req.body.isAvalaible')'));
    }
})

app.get('/EventAnswers/', function(req, res){
	if(typeof req.params.userID != 'undefined' && typeof req.params.EventSlotID != 'undefined'){
		res.json(connection.query('SELECT * FROM EventAnswer'));
	}else{
		res.status(400).json({error: 'Aucune réponse !'});
	}
})

app.put('/EventAnswer/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Evenement non trouvé' });
    }else if(connection.query('SELECT * FROM user WHERE userID='req.body.userID' AND ;') != 'undefined'){
    	connection.query('UPDATE TABLE EventAnswer SET userID='req.body.userID', EventSlotID='req.body.EventSlotID', comment='req.body.comment';');
    	res.json(connection.query('SELECT * FROM user WHERE userID='req.body.userID' AND ;'));
    }else{
    	res.status(400).json({error: 'Erreur lors de la modification'});
    }
})

module.exports = router;

 */