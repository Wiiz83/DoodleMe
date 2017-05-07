var crypto = require('crypto');

module.exports =  function (user){
     var salt = '}8%9VPh7cH}]u~Bu';
     var token = user.ID+user.pseudo+"secret..";
    return crypto.pbkdf2Sync(token, salt,  100000, 256, 'sha256').toString('hex');
}