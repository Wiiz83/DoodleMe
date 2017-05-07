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
 

module.exports = router;