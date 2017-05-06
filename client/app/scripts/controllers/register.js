'use strict';

 angular.module('clientApp')
  .controller('RegisterCtrl',function ($scope, DoodleMeUsers, NewUser) {
	console.log("1");
    $scope.resultat = '';
    $scope.obj = { id : '0', somme : '0' };
    console.log("2");
    $scope.creerCompte = function() {
	  console.log("3");
      var objToSave = new MyFactoryComptes();
      objToSave.id = $scope.obj.id;
      objToSave.somme = $scope.obj.somme;
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };
});

 /*
 .controller('RegisterCtrl', function ($scope, eventService) {
 	$scope.createUser = function(){
    		eventService.create($scope.event, function(data){
    			$scope.status = data.status;
    		});
    };
 });
*/