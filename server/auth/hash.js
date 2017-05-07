var crypto = require('crypto');
var salt = 'C3Dn6]vsXxakJ/=+';

var hashPassword = function(pass){
    return crypto.pbkdf2Sync(pass, this.salt, 1000, 64).toString('hex');
}


module.exports = hashPassword ;