var express = require('express');
var router = express.Router();

var users_route = router.route('/users');
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
            return res.sendStatus(400);
        }

    //inserting into mysql
    req.getConnection(function (err, conn) {
        if (err) return res.sendStatus(500).json(err);
        var query = conn.query("INSERT INTO users (firstName, lastName, pseudo, passHash)  VALUES (?,?,?,?)",
            data, function (err, result) {
                if (err) {
                    console.log(query.sql);
                    console.log(err);
                    return res.sendStatus(500).json(err);
                }
                else
                    return res.json(result);
            });
    });
});

module.exports = router;
