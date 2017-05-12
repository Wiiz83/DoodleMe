var express = require('express');
var router = express.Router();

router.get('/events/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM events WHERE ID=? ;', req.params.id, function (err, rows) {
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

router.put('/events/:id/close/:slotID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('UPDATE events SET closedSlotID = ? WHERE ID=?;  ', req.params.slotID, req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				res.status(500).send({ status: "Erreur", description: err.message });
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

router.get('/events/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM events where creatorID=?;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

router.get('/events/answeredBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT E.* FROM events as E WHERE EXISTS( SELECT * FROM eventslots as S WHERE S.eventID=E.ID AND EXISTS( SELECT * FROM eventAnswers as A WHERE A.EventSlotID=S.ID AND A.userID=?) ORDER BY S.eventDate);',req.params.userID, function (err, rows) {
			
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

router.get('/events/closed/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM events where creatorID=? AND closedSlotID != null;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

router.get('/events/open/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM events where creatorID=? AND closedSlotID == null;',req.params.userID, function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else
				res.json(rows);
		});
	});
});

router.get('/events/archives/createdBy/:userID', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT * FROM eventsArchives where creatorID=?;',req.params.userID, function (err, rows) {
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
