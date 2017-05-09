var express = require('express');
var router = express.Router();

connection.connect(function(err) {
  if (err) throw err;
});


function eventAnswer(idEvent, idUser, eventAns){
	this.idEvent = idEvent;
	this.idUser = idUser;
	this.eventAns = eventAns;
}

var changeAnswer = function(newAnswer){
	this.eventAnswer = newAnswer;
}

router.get('/eventAnswer/:id', function (req, res) {
    if(typeof req.params.userID === 'undefined' || typeof req.params.EventSlotID === 'undefined' || typeof req.params.isAvalaible === 'undefined') {
        res.status(404).send({ status: "Erreur", description: "Réponse non trouvé" });
    }else{
        var query = conn.query('SELECT * FROM EventAnswers WHERE userID = ? AND EventSlotID = ?;', req.params.userID, req.params.EventSlotID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else{
                if(rows.length == 0){
                    res.status(404).send({ status: "Erreur", description: "Aucune réponse" });
                }
				res.json(rows);
            }
		});
    }
})

router.post('/eventAnswer/', function (req, res){
    if(typeof req.body.EventSlotID === 'undefined' || typeof req.body.isAvalaible === 'undefined'){
        res.status(400).send({ status: "Erreur", description: "Réponse non  enregistrée" });
    }else{
        var query = conn.query('INSERT INTO EventAnswers(userID, EventSlotID, isAvailable) VALUES (?, ?, ?);', req.body.userID, req.body.EventSlotID, function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.send({ status: "Success", description: "Modification éffectuée" });
		});
    }
})

router.get('/EventAnswers/', function(req, res){
	if(typeof req.params.userID != 'undefined' && typeof req.params.EventSlotID != 'undefined'){
		var query = conn.query('SELECT * FROM EventAnswers', function (err, rows) {
			if (err) {
				console.log(err);
				res.sendStatus(500);
			}
			else
				res.json(rows);
		});
	}else{
		res.status(400).json({error: 'Aucune réponse !'});
	}
})

router.put('/EventAnswer/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Evenement non trouvé' });
    }else if(connection.query('SELECT * FROM user WHERE userID= ? AND EventSlotID = ?;', req.body.userID, req.body.EventSlotID).length != 0){
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
    	res.status(400).json({error: 'Erreur lors de la modification'});
    }
})

module.exports = router;