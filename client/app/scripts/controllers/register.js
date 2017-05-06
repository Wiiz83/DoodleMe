'use strict';

 angular.module('clientApp')
 .controller('RegisterCtrl', function ($scope, userService) {

 	$scope.createUser = function(){
        console.log("0")
    		userService.create($scope.event, function(data){
          console.log("1")
    			$scope.firstName = data.firstName;
          $scope.lastName = data.lastName;
          $scope.pseudo = data.pseudo;
          $scope.password = data.password;
    		});
    };

});


 /*
.controller('RegisterCtrl', function($scope, $http) {
 
   $scope.submit= function(){
      var data = $.param({
         user : JSON.stringify({
            firstName : $scope.firstName,
            lastName: $scope.lastName,
            pseudo : $scope.pseudo,
            password : $scope.password
       })
      });

      $http.post("/users", data).then(function(data, status) {
        console.log('User created successfully');
      })
   }
 
});
  */
