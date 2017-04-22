var express = require('express');
var app = express();
var server = require('http').Server(app);
var bodyParser = require('body-parser');
var  = require('');

server.listen(8080);

app.use(express.static(__dirname + '/../app'));
app.use('/bower_components', express.static(__dirname + '/../bower_components'));
app.use(bodyParser.json());

app.post('/event/', function (req, res) {
	if(req.body.id === 'undefined' || req.body.desc === 'undefined' || req.body.date === 'undefined'){
		res.status(400).json({ error: 'Il manque des paramètres pour la création de l\'évènement'});
	}else if(event.newEvent(req.body.id, req.body.desc, req.body.date)){
		res.json(event.listeEvents[id]);
	}
})

app.put('/event/', function (req, res) {
	res.setHeader('Content-Type', 'text/html');
    console.log(req.query);
    if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'Evenement non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	event.modificationEvent(req.body.id, req.body.desc, req.body.date);
    	res.json(event.listeEvents[id]);
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
    	res.json(event.listeEvents[id]);
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
		res.json(user.listeUsers[req.body.id]);
	}
})

app.get('/user/:id', function(req, res){
	if(typeof req.params.id === 'undefined') {
    	res.status(400).json({ error: 'utilisateur non trouvé' });
    }else if(event.listeEvents[id] != 'undefined'){
    	res.json(event.listeUsers[id]);
    }else{
    	res.status(400).json({error: 'Erreur lors de la récupération de l\'utilisateur'});
    }
})

app.get('/events/', function(req, res){
	if(event.listeEvents != null){
		res.json(event.listeEvents);	
	}else{
		res.status(400).json({error: 'Aucun évènement !'});
	}
})

app.get('/users/', function(req, res){
	if(event.listeUsers != null){
		res.json(event.listeUsers);	
	}else{
		res.status(400).json({error: 'Aucun utilisateur !'});
	}
})
