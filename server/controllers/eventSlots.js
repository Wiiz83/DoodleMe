
var express = require('express');
var router = express.Router();

var eventSlot_route = router.route('/eventSlot');

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

router.post('/eventSlot/', function (req, res){
	if(typeof req.body.eventID === 'undefined' || typeof req.body.eventDate === 'undefined' || typeof req.body.comment === 'undefined'){
		res.status(500).send({ status: "Erreur", description: "EventSlot non trouvé" });
	}else if(user.listeUsers[req.body.id] != 'undefined'){
		res.status(400).send({ status: "Erreur", description: "EventSlot déjà existant" });
	}else{
		var query = conn.query('INSERT INTO EventSlots(ID, eventID, eventDate, comment) VALUES (?, ?, ?, ?);', req.body.ID, req.body.eventID, req.body.eventDate, req.body.comment,function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.send({ status: "Success", description: "Modification éffectuée" });
		});
	}
})

router.get('/eventSlot/:ID', function(req, res){
	if(typeof req.params.ID === 'undefined') {
    	res.status(404).send({ status: "Erreur", description: "EventSlot non trouvé" });
    }else if(connection.query('SELECT * FROM EventSlots WHERE ID = '+req.body.ID+';') != 'undefined'){
    	var query = conn.query('SELECT * FROM EventSlots WHERE ID = ?;', req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else{
                if(rows.length == 0){
                    res.status(404).send({ status: "Erreur", description: "Aucun créneau" });
                }
				res.json(rows);
            }
		});
    }else{
    	res.status(500).send({ status: "Erreur", description: "Erreur lors de la récupération du créneau" });
    }
})

router.get('/eventSlots/', function(req, res){
	if(connection.query('SELECT * FROM eventSlots WHERE ID = '+req.body.ID+';') != 'undefined'){
		var query = conn.query('SELECT * FROM EventSlots', function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.json(rows);
		});
	}else{
		res.status(404).send({ status: "Erreur", description: "EventSlot non trouvé" });
	}
})

router.put('/eventSlot/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.ID === 'undefined') {
    	res.status(400).send({ error: 'Créneau non trouvé' });
    }else if(connection.query('SELECT * FROM EventSlots WHERE ID = ? AND eventID = ?', req.body.ID, req.body.eventID).length != 0){
    	 var query = conn.query('UPDATE TABLE EventAnswers SET userID = ?, EventSlotID = ?, isAvailable = ? WHERE userID = ? AND EventSlotID = ?',
             req.params.userID, req.params.EventSlotID, req.paramsisAvailable, req.paramsuserID, req.paramsEventSlotID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.send({ status: "Success", description: "Modification éffectuée" });
		});
    }else{
    	res.status(500).json({error: 'Erreur lors de la modification'});
    }
})

module.exports = router;
