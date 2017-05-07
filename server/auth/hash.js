var crypto = require('crypto');

module.exports = function(pass){
    var salt = 'C3Dn6]vsXxakJ/=+';
    return crypto.pbkdf2Sync(pass, salt,  100000, 32, 'sha1').toString('hex');
} ;