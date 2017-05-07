var express = require('express');
var router = express.Router();
var hash = require('../auth/hash.js');


var users_route = router.route('/register');


// GET all users
users_route.get(function (req, res) {
    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var query = conn.query('SELECT ID,firstName	,lastName, pseudo, registrationDate FROM users', function (err, rows) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else
                res.json(rows);
        });
    });
});


//Add a user
users_route.post(function (req, res) {
    var user = req.body;
    var data = [user.firstName, user.lastName, user.pseudo, user.password];
    for (var i = 0; i < data.length; i++)
        if (data[i] == undefined) {
            return res.status(400).send({ status: "Erreur", description: "Requete mal formattée" });
        }
    data[3] = hash(user.password);
    req.getConnection(function (err, conn) {
        if (err)
            return res.status(500).send({ status: "Erreur", description: "Problème de connexion à la base de données"});
        // insertion
        var query = conn.query("SELECT * FROM users WHERE pseudo=?",
            user.pseudo, function (err, result) {
                if (err) {
                    console.log(query.sql);
                    console.log(err);
                    return res.status(500).send({ status: "Erreur", description: err });
                }
                else
                    if (result.length > 0)
                        return res.status(409).send({ "status": "Erreur", "description": "L'utilisateur existe déja" });
                    else {
                        var query = conn.query("INSERT INTO users (firstName, lastName, pseudo, passHash)  VALUES (?,?,?,?)",
                            data, function (err, result) {
                                if (err) {
                                    console.log(query.sql);
                                    console.log(err);
                                    return res.status(500).send({ status: "Erreur", description: err.message });
                                }
                                else{
                                    res.cookie("pseudo", user.pseudo);
                                    return res.send({ status: "Succès"}); 
                                    }
                            });
                    }
            });
    });
});

module.exports = router;