var express = require('express');
var router = express.Router();

router.get('/notifications/user/:userID', function (req, res) {
    var userID = req.params.userID; 
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT E.* FROM events as E WHERE E.closedSlotID IS NOT NULL AND E.creatorID!=? AND EXISTS ( SELECT * FROM eventslots as S WHERE S.eventID=E.ID AND EXISTS ( SELECT * FROM eventAnswers as A WHERE A.EventSlotID=S.ID AND A.userID=?)) AND NOT EXISTS ( SELECT * FROM readnotifications as N WHERE N.userID=? AND N.eventID=E.ID) ;', 
            [userID,userID,userID], function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {				 
					return res.json(rows);
			}

		});
	});
});


router.get('/notifications/user/:userID/count', function (req, res) {
    var userID = req.params.userID; 
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('SELECT COUNT(*) as nb_notifications FROM events as E WHERE  E.creatorID!=? AND E.closedSlotID IS NOT NULL AND EXISTS ( SELECT * FROM eventslots as S WHERE S.eventID=E.ID AND EXISTS ( SELECT * FROM eventAnswers as A WHERE A.EventSlotID=S.ID AND A.userID=?)) AND NOT EXISTS ( SELECT * FROM readnotifications as N WHERE N.userID=? AND N.eventID=E.ID) ;', 
           [userID,userID,userID], function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {				 
					return res.json(rows[0]);
			}

		});
	});
});


router.post('/notifications/markasread/', function (req, res) {
	var notif = req.body;
	var data = [notif.userID, notif.eventID];
	for (var i = 0; i < data.length; i++)
		if (data[i] == undefined) {
			return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
		}

	req.getConnection(function (err, conn) {
		if (err)
			return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données" });
		else {
			var query = conn.query("INSERT INTO ReadNotifications (userID, eventID)  VALUES (?,?)",
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

router.post('/notifications/markallasread/:userID ', function (req, res) {
    var userID = req.params.userID; 
	req.getConnection(function (err, conn) {
		if (err) {
			console.log(err);
			return res.status(500).send({ status: "Erreur", description: err.message });
		}
		var query = conn.query('INSERT INTO ReadNotifications(userID, eventID) SELECT ? as userID , E.ID as eventID   FROM events as E WHERE E.closedSlotID IS NOT NULL AND E.creatorID!=? AND EXISTS ( SELECT * FROM eventslots as S WHERE S.eventID=E.ID AND EXISTS ( SELECT * FROM eventAnswers as A WHERE A.EventSlotID=S.ID AND A.userID=?)) AND NOT EXISTS ( SELECT * FROM readnotifications as N WHERE N.userID=? AND N.eventID=E.ID);', 
            [userID,userID,userID,,userID], function (err, rows) {
			if (err) {
				console.log(err);
				return res.status(500).send({ status: "Erreur", description: err.message });
			}
			else {				 
					return res.json(rows);
			}
		});
	});
});

module.exports = router;


