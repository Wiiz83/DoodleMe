// Chargement de Express.js
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    app = express(),
    expressValidator = require('express-validator');


app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

// Connexion BD SQL
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


// Démarage serveur
var server = app.listen(3000, function () {

    console.log("Listening to port %s", server.address().port);

});