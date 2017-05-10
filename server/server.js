// ignorer la sécurité (dev)
var unsecure = true;

// Chargement de Express.js
var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    app = express(),
    bodyParserJsonError = require('express-body-parser-json-error');
var token_calc = require('./auth/token.js');

app.use(express.static(__dirname + '/../client/app'));
//app.use(express.static('../client/app/views/html/', {index: 'login.html'}))
app.use('/bower_components', express.static(path.join(__dirname, '../client/bower_components')));
app.use(bodyParser.json());
app.use(bodyParserJsonError());// détection des json mal formattés
app.use(cookieParser());

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

// interception de toutes les requetes
app.use('/api', function (req, res, next) {
    if (req.url === '/login' || req.url === '/register' || unsecure)
        return next();
    else {
        if (req.cookies.id != undefined && req.cookies.pseudo != undefined && req.cookies.token != undefined) {
            var user = { ID: req.cookies.id, pseudo: req.cookies.pseudo };
            var token = req.cookies.token;
            var valid_token = token_calc(user);
            if (token === valid_token)
                return next();
            else
                return res.status(403).send({ status: "Erreur", description: "Accès refusé (Token invalide)" });
        }
        else {
            return res.status(403).send({ status: "Erreur", description: "Accès refusé (Cookie invalide)" });
        }

    }
});

// import controlleurs REST
app.use('/api', require('./controllers/register.js'));
app.use('/api', require('./controllers/event.js'));

app.use('/api', require('./controllers/eventAnswer.js'));
app.use('/api', require('./controllers/eventSlots.js'));
app.use('/api', require('./controllers/login.js'));
app.use('/api', require('./controllers/users.js'));


// Démarage serveur
var server = app.listen(3000, function () {
    console.log("Listening to port %s", server.address().port);
});