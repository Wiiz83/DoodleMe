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
			else
				res.json(rows);
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
	if (req.body.desc === 'undefined' || req.body.date === 'undefined') {
		res.status(400).send({ status: "Erreur", description: "Requête de création (event) mal formée" });
	} else if (event.newEvent(req.body.id, req.body.desc, req.body.date)) {
		req.getConnection(function (err, conn) {
			conn.query('INSERT INTO Events(title, description, address, creatorID, closedSlotID) VALUES (?, ?, ?, ?, ?);', req.params.title,
				req.params.description, req.params.address, req.params.creatorID, req.params.closedSlotID, function(err, rows){
					if (err) {
						console.log(err);
						res.sendStatus(500);
					}else{
						res.json(rows);
					}
				});
		});
	}
})

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
					}else{
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
