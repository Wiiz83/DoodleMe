var express = require('express');
var router = express.Router();


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
        var query = conn.query('SELECT * FROM events WHERE ID=? ;', req.params.id, function (err, rows) {
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


module.exports = router;