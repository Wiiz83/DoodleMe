/*
SELECT slots.*, A1.isAvailable
FROM eventanswers A1 RIGHT JOIN 
(
SELECT S.ID as sid, S.comment, 
DATE_FORMAT(S.eventDate,'%m-%d-%Y') as day, 
DATE_FORMAT(S.eventDate,'%h:%i') as time ,
SUM(case when A.isAvailable=1 then 1 else 0 end) as positiveAnswers,
SUM(case when A.isAvailable=0 then 1 else 0 end) as negativeAnswers 
FROM eventSlots as S, eventanswers A 
WHERE S.eventID=14 AND A.EventSlotID=S.ID 
GROUP BY S.ID 
    ) as slots ON slots.sid = A1.EventSlotID AND A1.userID =17 ;
*/
var express = require('express');
var router = express.Router();



router.get('/eventSlots/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("SELECT ID, eventID, comment, DATE_FORMAT(eventDate,'%m-%d-%Y') as day,DATE_FORMAT(eventDate,'%h:%i') as time FROM eventSlots WHERE ID=? ;", req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				if (rows.length == 0)
					return res.status(404).send({ status: "Erreur", description: "Element non trouvé." });
				else
					return res.json(rows[0]);
			}
		});
	});
});

  router.get('/eventSlots/byEvent/:eventID/user/:userID', function (req, res) {
	var eventID = req.params.eventID;
	var userID = req.params.userID;
	var data =[eventID,userID];
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query("call doodlme.GetEventSlots(?); select * from eventSlotsDetails; SELECT eventSlotsDetails.*,eventanswers.isAvailable FROM eventanswers RIGHT JOIN eventSlotsDetails ON eventSlotsDetails.ID = eventanswers.EventSlotID AND eventanswers.userID = ?;", data, function (err, rows) {
			if (err) {							

				console.log(err);
				res.sendStatus(500);
				console.log(query.sql);
			}
			else{
				console.log(query.sql);
				res.json(rows[2]);
				}
		});
	});
});


router.get('/eventSlots/byEvent/:EventID/', function (req, res) {
	var eventID = req.params.EventID;
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query("SELECT ID, eventID, comment, DATE_FORMAT(eventDate,'%m-%d-%Y') as day,DATE_FORMAT(eventDate,'%h:%i') as time FROM eventSlots WHERE eventID=?;", eventID, function (err, rows) {
			if (err) {					
				res.sendStatus(500);
				console.log(query.sql);
			}
			else
				res.json(rows);
		});
	});
});

router.post('/eventSlots/', function (req, res) {
	var eventSlot = req.body;
	if (eventSlot.comment==undefined)
	eventSlot.comment="";
	var data = [eventSlot.eventID, eventSlot.day, eventSlot.time, eventSlot.comment];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}
	slot = [eventSlot.eventID,eventSlot.day+" "+eventSlot.time+":00",eventSlot.comment]
	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("INSERT INTO eventSlots (eventID, eventDate, comment)  VALUES (?,?,?)",
				slot, function (err, result) {
					if (err) {
						console.log(query.sql);
						console.log(err);
						return res.status(500).send({ status: "Erreur", description: err.message });
					}
					else {
						return res.send({ status: "Succès", description:result.insertId}); 
					}
				});
		}
	});
});


router.put('/eventSlots/:id', function (req, res) {
	console.log(req.query);
	var eventSlot = req.body;
	var data = [eventSlot.day, eventSlot.time, eventSlot.comment];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formatée" });
		}
	slot = [eventSlot.day+" "+eventSlot.time+":00",eventSlot.comment,req.params.id]
	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query('UPDATE eventSlots SET eventDate = ?, comment = ? WHERE ID = ?;', slot, function (err, rows) {
				console.log(query.sql);
				if (err) {
					console.log(err);
					
					return res.status(500).send({ status: "Erreur", description: err.message });
				}
				else {
					if (rows.affectedRows == 0)
						return res.status(404).send({ status: "Erreur", description: "Elément non trouvé." });
					else
						return res.send({ status: "Succès" });
				}

			});
		}
	});
});

router.delete('/eventSlots/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query('DELETE FROM eventSlots WHERE ID=? ;', req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else {
				if (rows.affectedRows == 0)
					return res.status(404).send({ status: "Erreur", description: "Elément non trouvé." });
				else
					return res.send({ status: "Succès" });
			}

		});
	});
});


router.get('/eventSlots/recommanded/:eventID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("Select slot.ID, DATE_FORMAT(eventDate,'%m-%d-%Y') as day,DATE_FORMAT(eventDate,'%h:%i') as time,comment, COUNT(answer.EventSlotID) as positiveAnswers FROM eventslots slot, eventanswers answer WHERE slot.eventID=? AND answer.EventSlotID=slot.ID AND answer.isAvailable=1 GROUP BY answer.EventSlotID ORDER BY positiveAnswers DESC;",req.params.eventID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});


router.get('/eventSlots/:slotID/usersAnswers/positive', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("Select users.ID, users.firstName, users.lastName, users.pseudo, users.registrationDate , eventanswers.isAvailable FROM users, eventanswers WHERE eventanswers.EventSlotID=? AND eventanswers.isAvailable=1 AND users.ID = eventanswers.userID ;",req.params.slotID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

router.get('/eventSlots/:slotID/usersAnswers/negative', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("Select users.ID, users.firstName, users.lastName, users.pseudo, users.registrationDate , eventanswers.isAvailable FROM users, eventanswers WHERE eventanswers.EventSlotID=? AND eventanswers.isAvailable=0 AND users.ID = eventanswers.userID ;",req.params.slotID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});


module.exports = router;
