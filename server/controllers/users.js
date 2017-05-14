var express = require('express');
var router = express.Router();
var hash = require('../auth/hash.js');


// GET all users
router.get('/users/', function (req, res) {
    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        var query = conn.query('SELECT ID,firstName	,lastName, pseudo, registrationDate FROM users', function (err, rows) {
            if (err) {
                console.log(err);
                return res.status(500).send({ status: "Erreur", description: err.message });
            }
            else
                res.json(rows);
        });
    });
});

router.get('/users/:id', function (req, res) {
    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: "Erreur", description: err.message });
        }
        var query = conn.query('SELECT * FROM users WHERE ID=? ;', req.params.id, function (err, rows) {
            if (err) {
                console.log(query.sql);
                return res.status(500).send({ status: "Erreur", description: err.message });
            }
            else {
				if (rows.length == 0)
					return res.status(404).send({ status: "Erreur", description: "Elément non trouvé." });
				else
					return res.json(rows[0]);
			}
        });
    });
});


router.delete('/users/:id', function (req, res) {
    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: "Erreur", description: err.message });
        }
        var query = conn.query('DELETE FROM users WHERE ID=?;', req.param.id, function (err, rows) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                if (rows.affectedRows == 0)
                    return res.status(404).send({ status: "Erreur", description: "Utilisateur à supprimer non trouvé." });
                else
                    return res.send({ status: "Succès" });
            }
        });
    });
});

router.put('/users/:id', function (req, res) {
    if (req.param.id!==req.cookies.id)
        return res.status(403).send({ status: "Erreur", description: "Accès refusé" });
    var user = req.body;
    var data = [user.firstName, user.lastName];
    var new_password = user.password
    if (new_password!=undefined)
        data.push(hash(new_password))
    data.push( req.param.id);

    req.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            return res.status(500).send({ status: "Erreur", description: err.message });
        }
        if (new_password!=undefined)
        var query = conn.query('UPDATE users set firstName=?, lastName=?  WHERE ID=?;', data, function (err, rows) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                if (rows.affectedRows == 0)
                    return res.status(404).send({ status: "Erreur", description: "Utilisateur à supprimer non trouvé." });
                else
                    return res.send({ status: "Succès" });
            }
        });
        else 
        var query = conn.query('UPDATE users set firstName=?, lastName=? , passHash=? WHERE ID=?;', data, function (err, rows) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            else {
                if (rows.affectedRows == 0)
                    return res.status(404).send({ status: "Erreur", description: "Utilisateur à supprimer non trouvé." });
                else
                    return res.send({ status: "Succès" });
            }
        });
    });
});


module.exports = router;