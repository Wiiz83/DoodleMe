
var express = require('express');
var router = express.Router();

 


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

router.get('/eventSlots/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query('SELECT * FROM eventSlots WHERE ID=? ;', req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else {
				if (rows.length == 0)
					return res.status(404).send({ status: "Erreur", description: "Element non trouvé." });
				else
					return res.json(rows);
			}
		});
	});
});


router.get('/eventSlots/', function (req, res) {
	var eventID = req.query.EventID;
	if (eventID==undefined)
		return res.status(400).send({ status: "Erreur", description: "EventID non spécifié" });
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query('SELECT * FROM eventSlots WHERE eventID=?;', eventID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.json(rows);
		});
	});
});

router.post('/eventSlots/', function (req, res) {
	var eventSlot = req.body;
	var data = [eventSlot.eventID, eventSlot.eventDate, eventSlot.comment];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}
	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("INSERT INTO eventSlots (eventID, eventDate, comment)  VALUES (?,?,?)",
				data, function (err, result) {
					if (err) {
						console.log(query.sql);
						console.log(err);
						return res.status(500).send({ status: "Erreur", description: err.message });
					}
					else {
						return res.send({ status: "Succès" });
					}
				});
		}
	});
});


 router.put('/eventSlots/:id', function (req, res) {
	console.log(req.query);
	var event = req.body;
 	var data = [eventSlot.eventDate, eventSlot.comment];

	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}

	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("UPDATE TABLE events SET eventDate = ?, comment = ?; ",
				data, function (err, result) {
					if (err) {
						console.log(query.sql);
						console.log(err);
						return res.status(500).send({ status: "Erreur", description: err.message });
					}
					else {
						return res.send({ status: "Succès" });
					}
				});
		}
	});
});



module.exports = router;
