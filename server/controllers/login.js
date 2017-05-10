var express = require('express');
var hash  = require('../auth/hash.js');
var getAuthToken  = require('../auth/token.js');
var router = express.Router();

var auth_route = router.route('/login');
 //Add a user
auth_route.post(function (req, res) {
    var user = req.body;
    var data = [user.pseudo, user.password];
    for (var i = 0; i < data.length; i++)
        if (data[i] == undefined) {
            return res.status(400).send({ status: "Erreur", description: "Requete mal formée" });
        }
    data[1] = hash(user.password);
     req.getConnection(function (err, conn) {
        if (err) 
        return res.status(500).send({ status: "Erreur", description: err.message });
        var query = conn.query("SELECT * FROM USERS WHERE pseudo=? AND passHash=?",
            data, function (err, result) {
                 console.log(query.sql);
                if (err) {                   
                    console.log(err);
                    return res.status(500).send({ status: "Erreur", description: err.message });
                }
                if (result.length == 1) {                    
                    var user = result[0];
                    console.log(user);
                    res.cookie("id", user.ID);
                    res.cookie("pseudo", user.pseudo );
                    res.cookie("firstName", user.firstName);
                    res.cookie("lastName", user.firstName);
                    res.cookie("token",getAuthToken(user));
                    return res.send({ status: "succès"});
                }
                else
                    return res.status(401).send({ status: "Erreur", description: "Pseudo/mot de passe invalides" });
            });
    });
});

module.exports = router;