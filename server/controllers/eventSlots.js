var express = require('express');
var app = express.Router();
var server = require('http').Server(app);
var bodyParser = require('body-parser');


connection.connect(function(err) {
  if (err) throw err;
});


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

app.post('/eventSlot/', function (req, res){
	if(typeof req.body.eventID === 'undefined' || typeof req.body.eventDate === 'undefined' || typeof req.body.comment === 'undefined'){
		res.status(500).json({error: 'eventSlot non enregistré'});
	}else if(user.listeUsers[req.body.id] != 'undefined'){
		res.status(400).json({error: 'eventSlot déjà existant'});
	}else{
		res.json(connection.query('INSERT INTO eventSlots(ID, eventId, eventDate, comment) VALUES ('req.body.ID', 'req.body.eventID', 'req.body.eventDate', 'req.body.comment')'));
	}
})

app.get('/eventSlot/:ID', function(req, res){
	if(typeof req.params.ID === 'undefined') {
    	res.status(404).json({ error: 'eventSlot non trouvé' });
    }else if(connection.query('SELECT * FROM eventSlots WHERE ID = 'req.body.ID';') != 'undefined'){
    	res.json(connection.query('SELECT * FROM eventSlots WHERE ID = 'req.body.ID';'));
    }else{
    	res.status(500).json({error: 'Erreur lors de la récupération de l\'utilisateur'});
    }
})

app.get('/eventSlots/', function(req, res){
	if(connection.query('SELECT * FROM eventSlots WHERE ID = 'req.body.ID';') != 'undefined'){
		res.json(connection.query('SELECT * FROM eventSlots'));
	}else{
		res.status(404).json({error: 'Aucun eventSlot !'});
	}
})

app.put('/eventSlot/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.ID === 'undefined') {
    	res.status(400).json({ error: 'Mauvaise requête' });
    }else if(connection.query('SELECT * FROM eventSlots WHERE ID = 'req.body.ID';')){
    	connection.query('UPDATE TABLE eventSlot SET idEventSlot='req.body.ID', idEvent='req.body.idEvent', eventDate='req.body.eventDate' WHERE idEventSlot='req.body.ID';');
    	res.json(connection.query('SELECT * FROM eventSlots WHERE idEventSlot='req.body.ID';'));
    	res.json(event.listeUsers[id]);
    }else{
    	res.status(500).json({error: 'Erreur lors de la modification'});
    }
})

module.exports = router;