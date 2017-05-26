var express = require('express');
var router = express.Router();


////CRUD
router.get('/events/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query(' SELECT events.*,users.pseudo FROM events, users WHERE events.ID=? and users.ID=events.creatorID;', req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				if (rows.length == 0)
					return res.status(404).send({ status: "Erreur", description: "Evenement non trouvé." });
				else
					return res.json(rows[0]);
			}

		});
	});
});


router.get('/events/', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM events', function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.json(rows);
		});
	});
});

router.post('/events/', function (req, res) {
	var event = req.body;
	var data = [event.title, event.description, event.address, event.creatorID];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}
	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("INSERT INTO events (title, description, address, creatorID)  VALUES (?,?,?,?)",
				data, function (err, result) {
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

router.put('/events/:id', function (req, res) {
	console.log(req.query);
	var event = req.body;
	var data = [event.title, event.description, event.address, req.params.id];

	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}

	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("UPDATE events SET title = ?, description = ?, address= ? WHERE ID=?; ",
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

router.delete('/events/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('DELETE FROM events WHERE ID=? ;', req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				if (rows.affectedRows == 0)
					return res.status(404).send({ status: "Erreur", description: "Evenement à supprimer non trouvé." });
				else
					return res.send({ status: "Succès" });
			}
		});
	});
});
//////////////////////ACTIONS
router.put('/events/:id/close/:slotID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('UPDATE events SET closedSlotID = ? WHERE ID=?;  ', [req.params.slotID, req.params.id], function (err, rows) {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				if (rows.affectedRows == 0)
					return res.status(404).send({ status: "Erreur", description: "Evenement à metre à jour non trouvé." });
				else
					return res.send({ status: "Succès" });
			}
		});
	});
});

/////////////FILTRES
////////////////////CREATIONS

//Mes événements à venir : clos et date cloture > aujourd'hui
//ok

router.get('/events/closed/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM  upcomingEvents where creatorID=? AND  closedSlotID IS NOT NULL;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

//Mes événements en attente : ouvert et ayant un slot: slot.date > aujourd'hui
// ok 
router.get('/events/open/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM  upcomingEvents where creatorID=? AND  closedSlotID IS  NULL;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				res.json(rows);
			}
		});
	});
});
// évènements ayant closedslot.date <aujourd'hui ou slot.date < aujourd'hui 
router.get('/events/archived/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM archivedEvents where creatorID = ? ;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {
				res.json(rows);
			}
		});
	});
});


//////////////////////REPONSES

// Events auxquels l'utilisateur a donné une réponse

// A venir et fermés : 
router.get('/events/upcoming/closed/anweredBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("select * from upcomingEvents, eventSlots, eventanswers where upcomingEvents.ID=eventSlots.eventID AND eventSlots.ID = eventanswers.EventSlotID AND upcomingEvents.closedSlotID IS NOT NULL AND eventanswers.userID = ? GROUP BY upcomingEvents.ID ;"
		,req.params.userID, function (err, rows) {
			
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

// En attente: à venir et ouverts 
router.get('/events/upcoming/open/anweredBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("select * from upcomingEvents, eventSlots, eventanswers where upcomingEvents.ID=eventSlots.eventID AND eventSlots.ID = eventanswers.EventSlotID AND upcomingEvents.closedSlotID IS  NULL AND eventanswers.userID = ? GROUP BY upcomingEvents.ID ;"
		,req.params.userID, function (err, rows) {
			
			if (err) {
				console.log(err);
				console.log(query.sql);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

// evenement archivés et avec une réponse 
router.get('/events/archived/anweredBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query("select * from archivedEvents, eventSlots, eventanswers where archivedEvents.ID=eventSlots.eventID AND eventSlots.ID = eventanswers.EventSlotID  AND eventanswers.userID = ? GROUP BY archivedEvents.ID ;"
		,req.params.userID, function (err, rows) {
			
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
