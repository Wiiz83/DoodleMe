'use strict';

 angular.module('clientApp')
 .controller('UserCtrl', function ($routeParams, $scope, $location, FactoryUser, $cookieStore, $cookies, dataService) {

    var userID = $routeParams.userID;
    var userEnCours = $cookieStore.get('id');
    var userEnCoursDetails = {};
    $scope.userEdit = 0;
    
    if(userEnCours == userID){
        $scope.isVisible = true;
    } else {
        $scope.isVisible = false;
    }

    FactoryUser.get({id: userID}, function (data) {
        $scope.user = data;
        userEnCoursDetails = data;
    }, function (response) {
        $scope.errorMessage = response.data.description;
    });

    $scope.deconnexion = function () {
        $cookieStore.remove("id");
        $cookies.remove("id");
        $cookieStore.remove("pseudo");
        $cookies.remove("pseudo");
        $cookieStore.remove("token");
        $cookies.remove("token");
        dataService.setData("deconnexion");
        $location.path('');
    }

    $scope.edit = function () {
        $scope.userEdit = 1;
        $scope.prenom = userEnCoursDetails.firstName;
        $scope.nom = userEnCoursDetails.lastName;
        $scope.pseudo = userEnCoursDetails.pseudo;
    }

    $scope.save = function () {
        var user = {userID: userEnCours, firstName: $scope.prenom, lastName: $scope.nom, pseudo: $scope.pseudo, password: $scope.password};
        FactoryUser.update({id: userEnCours}, user, function (response) {
            $successMessageConsult = "Modifications enregistrées.";
            $scope.userEdit = 0;
        }, function (response) {
            $scope.errorMessage = response.data.description;
        });
    }

    $scope.undo = function () {
        $scope.userEdit = 0;
    }

    $scope.delete = function () {
        FactoryUser.delete({id: userID}, function (response) {
            console.log(response);
            angular.element('#myModalDelete').modal('hide');
            angular.element('body').removeClass('modal-open');
            angular.element('.modal-backdrop').remove();
            dataService.setData("deleteSuccess");
            $location.path('');
        }, function (response) {
            console.log(response);
            $scope.errorMessage = response.data.description;
        });

    }
});




