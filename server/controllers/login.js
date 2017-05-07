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
            return res.sendStatus(400);
        }
    data[1] = hash(user.password);
     req.getConnection(function (err, conn) {
        if (err) return res.sendStatus(500).json(err);
        var query = conn.query("SELECT * FROM USERS WHERE pseudo=? AND passHash=?",
            data, function (err, result) {
                 console.log(query.sql);
                if (err) {                   
                    console.log(err);
                    return res.sendStatus(500).json(err);
                }
                if (result.length == 1) {                    
                    var user = result[0];
                    console.log(user);
                    res.cookie("pseudo", user.pseudo );
                    res.cookie("token",getAuthToken(user));
                     return res.send({ status: "SUCCES"});
                }
                else
                    return res.sendStatus(401);
            });
    });
});

module.exports = router;