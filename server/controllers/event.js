var express = require('express');
var router = express.Router();

var event_route = router.route('/event');

function events(id, desc, date) {
	this.desc = desc;
	this.date = new Date(date);
	//this.heure = 
	this.participants = 0;
	this.state = new State();
	this.addUser = function () {
		this.participants++;
	}

	this.remUser = function () {
		this.participants--;
	}

}

/*var remEvent = function(id){
	if(typeof listeEvents[id] != 'undefined'){
		listeEvents[id] = null;
		return 1;
	}
	return 0;
}*/


var getDate = function () {
	return this.date;
}


event_route.get('/events/:id', function (req, res) {
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



event_route.get('/events/', function (req, res) {
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

event_route.post('/events/', function (req, res) {
	if (req.body.desc === 'undefined' || req.body.date === 'undefined') {
		res.status(400).json({ error: 'Il manque des paramètres pour la création de l\'évènement' });
	} else if (event.newEvent(req.body.id, req.body.desc, req.body.date)) {
		req.getConnection(function (err, conn) {
			conn.query('INSERT INTO Events(title, description, address, creatorID, closedSlotID) VALUES (' + req.body.title + ', ' + req.body.description + ', ' + req.body.address + ', ' + req.body.creatorID + ', ' + closedSlotID + ');');
			res.json(connection.query('SELECT * FROM user WHERE idUser=' + req.body.idUser + ';'));
		});
	}
})

event_route.put('/events/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
	console.log(req.query);
	if (typeof req.params.id === 'undefined') {
		res.status(400).json({ error: 'Evenement non trouvé' });
	} else {
		req.getConnection(function (err, conn) {
			if (conn.query('SELECT * FROM user WHERE idEvent=' + req.body.idEvent + ';') != 'undefined') {
				conn.query('UPDATE TABLE events SET description=' + req.body.description + ', date=' + req.body.date + ';');
				res.json(connection.query('SELECT * FROM user WHERE idEvent=' + req.body.idEvent + ';'));
			} else {
				res.status(400).json({ error: 'Erreur lors de la modification' });
			}
		});
	}
})
module.exports = router;
