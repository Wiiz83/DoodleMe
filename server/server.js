// Chargement de Express.js
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    bodyParserJsonError = require('express-body-parser-json-error'); 


app.use(express.static('../client/app/', {index: 'login.html'}))
//app.use(express.static('../client/app/views/html/', {index: 'login.html'}))
app.use('/bower_components',  express.static( path.join(__dirname, '../client/bower_components')));
app.use(bodyParser.json());
app.use(bodyParserJsonError());// détection des json mal formattés

// Connexion BD MySQL
var mysql = require('mysql');
var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'doodlme'
});

// Ajout d'un nouvel utilisateur
app.post('/users', function(req, res){
  var data = req.body;
  console.log(data);
  // check si informations sont toutes remplis 
   if(typeof data.firstName === 'undefined' || typeof data.lastName === 'undefined' || typeof data.pseudo === 'undefined' || typeof data.password === 'undefined') {
          res.status(400).json({ error: 'Merci de remplir tous les champs.' });
  } else {
    // vérifie que le pseudo n'existe pas déjà
    var queryExists = 'SELECT * FROM users WHERE pseudo="' + data.pseudo + '";';
    console.log(queryExists);
    connection.query(queryExists, data, function (err, result) {
      if (err)
        return res.status(500);
      if (result.length>0) {
       return  res.status(409).json({ error: "Le pseudo "+data.pseudo+" est déjà utilisé." });
      } else {
        // insertion de l'utilisateur dans la base
        var query = "INSERT INTO users (`firstName`, `lastName`, `pseudo`, `passHash`) VALUES ('" + data.firstName + "', '" + data.lastName + "', '" + data.pseudo + "', '" + data.password + "');";
        console.log(query);
        connection.query(query, data, function (err, result) {
          if (err) {
            console.error(err);
            return res.send(err);
          } else {
            return res.send('Ok');
          }
        });
      }
    });
  }
});



// import controlleurs REST
//app.use('/api', require('./controllers/users.js'));
//app.use('/api', require('./controllers/event.js'));
//app.use('/api', require('./controllers/eventAnswer.js'));
//app.use('/api', require('./controllers/eventSlot.js'));
//app.use('/api', require('./controllers/auth.js'));


// Démarage serveur
var server = app.listen(3000, function () {
    console.log("Listening to port %s", server.address().port);
});