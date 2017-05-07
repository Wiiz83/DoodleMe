var getAuthToken = function (userID, userPassHash){
    return userID+userPassHash;
}

module.exports = getAuthToken ;