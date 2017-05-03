var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var connection = mysql.createCOnnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'projetWeb'
})

connection.connect(function(err) {
  if (err) throw err;
});

server.listen(8080);

app.use(express.static(__dirname + '/../app'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use(bodyParser.json());

app.post('/event/', function (req, res) {
	if(req.body.id === 'undefined' || req.body.desc === 'undefined' || req.body.date === 'undefined'){
		res.status(400).json({ error: 'Il manque des paramètres pour la création de l\'évènement'});
	}else if(event.newEvent(req.body.id, req.body.desc, req.body.date)){
		connection.query('UPDATE TABLE user SET nom='req.body.nom', prenom='req.body.prenom', pseudo='req.body.pseudo' WHERE idUser='req.body.id';');
    	res.json(connection.query('SELECT * FROM user WHERE idUser='req.body.idUser';'));
	}
})

app.put('/event/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Evenement non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	connection.query('UPDATE TABLE events SET description='req.body.description', date='req.body.date';');
    	res.json(connection.query('SELECT * FROM user WHERE idEvent='req.body.idEvent';'));
    }else{
    	res.status(400).json({error: 'Erreur lors de la modification'});
    }
})

/*app.delete('/event/', function (req, res) {
	if(req.body.id === 'undefined'){
		res.status(400).json({ error: 'Elément introuvable'});
	}else if(event.remEvent(req.body.id)){

	}
}*/

app.get('/event/:id', function (req, res) {
	if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Evenement non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	res.json(connection.query('SELECT * FROM events WHERE idEVent = 'req.body.idEvent';'));
    }else{
    	res.status(400).json({error: 'Erreur lors de la récupération de l\'évènement'});
    }
})

app.post('/user/', function (req, res){
	if(typeof req.body.id === 'undefined' || typeof req.body.nom === 'undefined' || typeof req.body.prenom === 'undefined'){
		res.status(400).json({error: 'Utilisateur non enregistré'});
	}else if(user.listeUsers[req.body.id] != 'undefined'){
		res.status(400).json({error: 'Utilisateur déjà existant'});
	}else{
		res.json(connection.query('INSERT INTO users(nomU, prenomU, pseudo, mdp) VALUES ('req.body.nom', 'req.body.prenom', 'req.body.pseudo', 'req.body.mdp')'));
	}
})

app.get('/user/:id', function(req, res){
	if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'utilisateur non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	res.json(connection.query('SELECT * FROM users WHERE idUser = 'req.body.idUser';'));
    }else{
    	res.status(400).json({error: 'Erreur lors de la récupération de l\'utilisateur'});
    }
})

app.get('/events/', function(req, res){
	if(event.listeEvents != null){
		res.json(connection.query('SELECT * FROM events'));
	}else{
		res.status(400).json({error: 'Aucun évènement !'});
	}
})

app.get('/users/', function(req, res){
	if(event.listeUsers != null){
		res.json(connection.query('SELECT * FROM users'));	
	}else{
		res.status(400).json({error: 'Aucun utilisateur !'});
	}
})

app.put('/user/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Utilisateur non trouvé' });
    }else if(event.listeUsers[id] != 'undefined'){
    	connection.query('UPDATE TABLE users SET nom='req.body.nom', prenom='req.body.prenom', pseudo='req.body.pseudo' WHERE idUser='req.body.id';');
    	res.json(connection.query('SELECT * FROM user WHERE idUser='req.body.idUser';'));
    	res.json(event.listeUsers[id]);
    }else{
    	res.status(400).json({error: 'Erreur lors de la modification'});
    }
})

app.post('/eventSlot/', function (req, res){
	if(typeof req.body.id === 'undefined' || typeof req.body.nom === 'undefined' || typeof req.body.prenom === 'undefined'){
		res.status(400).json({error: 'eventSlot non enregistré'});
	}else if(user.listeUsers[req.body.id] != 'undefined'){
		res.status(400).json({error: 'eventSlot déjà existant'});
	}else{
		res.json(connection.query('INSERT INTO eventSlots(idEventSlot, eventDate, eventId VALUES ('req.body.idEventSlot', 'req.body.idEvent', 'req.body.eventDate')'));
	}
})

app.get('/eventSlot/:id', function(req, res){
	if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'eventSlot non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	res.json(connection.query('SELECT * FROM eventSlots WHERE idEventSlot = 'req.body.idEventSlot';'));
    }else{
    	res.status(400).json({error: 'Erreur lors de la récupération de l\'utilisateur'});
    }
})

app.get('/eventSlots/', function(req, res){
	if(event.listeEvents != null){
		res.json(connection.query('SELECT * FROM eventSlots'));
	}else{
		res.status(400).json({error: 'Aucun évènement !'});
	}
})

app.put('/eventSlot/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'eventSlot non trouvé' });
    }else if(event.listeUsers[id] != 'undefined'){
    	connection.query('UPDATE TABLE eventSlot SET idEventSlot='req.body.idEventSlot', idEvent='req.body.idEvent', eventDate='req.body.eventDate' WHERE idEventSlot='req.body.idEventSlot';');
    	res.json(connection.query('SELECT * FROM eventSlots WHERE idEventSlot='req.body.idEventSlot';'));
    	res.json(event.listeUsers[id]);
    }else{
    	res.status(400).json({error: 'Erreur lors de la modification'});
    }
})