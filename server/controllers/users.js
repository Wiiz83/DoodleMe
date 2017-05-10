var express = require('express');
var router = express.Router();
 

// GET all users
router.get('/users/',function (req, res) {
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

router.delete('/users/:id',function (req, res) {
    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var query = conn.query('DELETE FROM users WHERE ID=?;',req.param.id, function (err, rows) {
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