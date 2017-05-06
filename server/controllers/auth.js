var express = require('express');
var router = express.Router();

function getAuthToken (userID, userPassHash){
    return userID+userPassHash; //TODO
}

function hashPassword(pass){
    return pass;
}

var auth_route = router.route('/auth');
 //Add a user
auth_route.post(function (req, res) {
    var user = req.body;
    var data = [user.pseudo, user.password];
    for (var i = 0; i < data.length; i++)
        if (data[i] == undefined) {
            return res.sendStatus(400);
        }
    data[1] = hashPassword(user.password);
     req.getConnection(function (err, conn) {
        if (err) return res.sendStatus(500).json(err);
        var query = conn.query("SELECT * FROM USER WHERE pseudo=? AND passwordHash=?",
            data, function (err, result) {
                if (err) {
                    console.log(query.sql);
                    console.log(err);
                    return res.sendStatus(500).json(err);
                }
                if (result[0].cnt == 1) {
                    return res.json(getAuthToken(data));
                }
                else
                    return res.sendStatus(401);
            });
    });
});

module.exports = router;
