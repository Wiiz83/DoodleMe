var express = require('express');
var router = express.Router();

 


function eventAnswer(idEvent, idUser, eventAns){
	this.idEvent = idEvent;
	this.idUser = idUser;
	this.eventAns = eventAns;
}

var changeAnswer = function(newAnswer){
	this.eventAnswer = newAnswer;
}

router.get('/eventAnswers/', function (req, res) {
	var SlotID = req.query.SlotID;
	if (SlotID==undefined)
		return res.status(400).send({ status: "Erreur", description: "SlotID non spécifié" });
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query('SELECT * FROM eventAnswers WHERE eventSlotID=?;', SlotID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.json(rows);
		});
	});
});

router.post('/eventAnswers/', function (req, res) {
	var answer = req.body;
	var data = [answer.eventSlotID, answer.userID, answer.isAvailable];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}
	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("INSERT INTO eventAnswers (eventSlotID, userID, isAvailable)  VALUES (?,?,?)",
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