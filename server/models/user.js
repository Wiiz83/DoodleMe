var userList = {};

function User(id, firstname, lastname, pseudo, password, registrationDate) {
  this.id = id;
  this.firstname = firstname;
  this.lastname = lastname;
  this.pseudo = pseudo;
  this.password = password;
  this.registrationDate = registrationDate;

  this.update = function(pseudo, password){
    this.pseudo = pseudo;
    this.password = password;
  }
}

var createUser = function(firstname, lastname, pseudo, password) {
  var id = shortid.generate();  // TODO : GENERER UN ID POUR CHAQUE NOUVEL UTILISATEUR
  var todayDate = new Date();   
  if (typeof userList[id] != 'undefined'){
    return 0;
  } else {
    userList[id] = new Event(id, firstname, lastname, pseudo, password, todayDate);
    return 1;
  }
}

var updateUser = function(id, pseudo, password){
  if (typeof userList[id] === 'undefined'){
    return 0;
  } else {
    userList[id].update(pseudo, password);
    return 1;
  }
}

var deleteUser = function(id){
  if (typeof userList[id] === 'undefined'){
    return 0;
  } else {
    delete userList[id];
    return 1;
  }
}

var getAllUsers = function(){
  return userList;
}

var getUser = function(id){
  return userList[id];
}

exports.createUser = createUser;
exports.updateUser = updateUser;
exports.deleteUser = deleteUser;
exports.getUser = getUser;
exports.getAllUsers = getAllUsers;
