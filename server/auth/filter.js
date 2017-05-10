var express = require('express');
var router = express.Router();
var token_calc = require('./token.js');
 
module.exports=function (req, res, next) {
    if (req.url === '/login' || req.url === '/register')
        return next();
    else {
        if (req.cookies.id != undefined && req.cookies.pseudo != undefined && req.cookies.token != undefined) {
            var user = { ID: req.cookies.id, pseudo: req.cookies.pseudo };
            var token = req.cookies.token;
            var valid_token = token_calc(user);
            if (token === valid_token)
                return next();
            else
                return res.status(403).send({ status: "Erreur", description: "Accès refusé (Token invalide)" });
        }
        else {
            return res.status(403).send({ status: "Erreur", description: "Accès refusé (Cookie invalide)" });
        }

    }
}