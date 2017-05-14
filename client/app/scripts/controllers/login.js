'use strict';

 angular.module('clientApp')
 .controller('LoginCtrl', function ($scope, $window, $rootScope, $location, $routeParams, FactoryLogin, dataService) {

	var globalData = dataService.getData();
  
  switch (globalData) {
    case "notConnected":
      $scope.successMessage = "Merci de vous reconnecter pour continuer.";
      dataService.setData("");
      break;

    case "registerSuccess":
      $scope.successMessage = "Inscription réussi, vous pouvez vous connecter.";
      dataService.setData("");
      break;
  
    default:
      break;
  }


  $scope.changeView = function(view){
      $location.path(view); 
  }


 	$scope.connectUser = function(){
        var objToSave = new FactoryLogin();
        objToSave.pseudo = $scope.pseudo;
        objToSave.password = $scope.password;

        objToSave.$save(function(response) {
           $location.path('accueil');
        }, function(response) {
          $scope.errorMessage = response.data.description;
        });
     };
});




