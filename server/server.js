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


app.post('/users', function(req, res){
  var data = req.body;
  var query = "INSERT INTO users (`firstName`, `lastName`, `pseudo`, `passHash`) VALUES ('" + data.firstName + "', '" + data.lastName + "', '" + data.pseudo + "', '" + data.password + "');";
  var query = connection.query(query, data, function (err, result) {
     if (err) {
       console.error(err);
       return res.send(err);
     } else {
       return res.send('Ok');
     }
});
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