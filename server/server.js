// Chargement de Express.js
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    bodyParserJsonError = require('express-body-parser-json-error'); 


app.use(express.static(path.join(__dirname, '../client/app')));
app.use('/bower_components',  express.static( path.join(__dirname, '../client/bower_components')));
app.use(bodyParser.json());
app.use(bodyParserJsonError());// détection des json mal formattés

// Connexion BD MySQL
var connection = require('express-myconnection'),
    mysql = require('mysql');

app.use(
    connection(mysql, {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'doodlme',
        debug: false
    }, 'request')
);


// import controlleurs REST
app.use('/api', require('./controllers/users.js'));
app.use('/api', require('./controllers/event.js'));
app.use('/api', require('./controllers/eventAnswer.js'));
app.use('/api', require('./controllers/eventSlot.js'));

// Démarage serveur
var server = app.listen(3000, function () {
    console.log("Listening to port %s", server.address().port);
});