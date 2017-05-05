var express = require('express');
var router = express.Router();

var users_route = router.route('/users');
// GET all users
users_route.get(function (req, res) {

    req.getConnection(function (err, conn) {

        if (err) {
            console.log(err);
            res.sendStatus(500);
        }

        var query = conn.query('SELECT ID,firstName	,lastName, pseudo,registrationDate	 FROM users', function (err, rows) {

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


    //inserting into mysql
    req.getConnection(function (err, conn) {

        if (err) return next("Cannot Connect");
        var user = req.body;
        var query = conn.query("INSERT INTO users (firstName, lastName, pseudo, passHash)  VALUES (?,?,?,?)",
            [user.firstName, user.lastName, user.pseudo, user.passHash], function (err, result) {

                if (err) {
                    console.log(query.sql);
                    console.log(err);
                    res.sendStatus(500);
                }
                else
                    res.json(result);
            });
    });
});

module.exports = router;
