var express = require('express');
var router = express.Router();

var getDate = function () {
	return this.date;
}

router.get('/events/:id', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
		}
		var query = conn.query('SELECT * FROM events WHERE ID=? ;', req.params.id, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else {
				if (rows.length == 0)
					return res.status(404).send({ status: "Erreur", description: "Evenement non trouvé." });
				else
					return res.json(rows);
			}

		});
	});
});


router.get('/events/', function (req, res) {
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.sendStatus(500);
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
						return res.send({ status: "Succès" });
					}
				});
		}
	});
});

router.put('/events/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	console.log(req.query);
	if (typeof req.params.id === 'undefined') {
		res.status(404).send({ status: "Erreur", description: "Evènement non trouvé" });
	} else {
		req.getConnection(function (err, conn) {
			if (conn.query('SELECT * FROM events WHERE idEvent = ?;', req.body.ID).length != 0) {
				conn.query('UPDATE TABLE events SET description = ?, date = ?;', req.body.description, req.body.date);
				var query = conn.query('SELECT * FROM events', function (err, rows) {
					if (err) {
						console.log(err);
						res.sendStatus(500);
					} else {
						res.json(rows);
					}
				});
			} else {
				res.status(400).send({ status: "Erreur", description: "Erreur lors de la modification" });
			}
		});
	}
})
module.exports = router;
