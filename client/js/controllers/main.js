'use strict';

/**
 * @ngdoc function
 * @name tp2App.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the tp2App
 */
console.log('ok 0');
angular.module('tp2App')
  .controller('MainCtrl',
  function ($scope, MyFactoryComptes, MyFactoryCompte) {
    console.log('ok 1');
    $scope.resultat = '';
    $scope.obj = { id : '0', somme : '0' };
    console.log('ok 2');
    $scope.creerCompte = function() {
      var objToSave = new MyFactoryComptes();
      objToSave.id = $scope.obj.id;
      objToSave.somme = $scope.obj.somme;
      objToSave.$save(function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };
 console.log('ok 3');

    $scope.position = function() {
      MyFactoryCompte.get({ id: $scope.obj.id }, function(retour) {
        $scope.resultat = retour;
      }, function(error) {
        $scope.resultat = error.data.error;
       });
    };

     console.log('ok 4');
    $scope.crediter = function() {
      //alert('test credit');
      MyFactoryCompte.update({ id:$scope.obj.id }, $scope.obj, function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };
    console.log('ok 5');
    $scope.debiter = function() {
      //alert('test débit');
      var obj = { id : $scope.obj.id, somme : $scope.obj.somme }

      if(obj.somme > 0) obj.somme = - obj.somme;
      MyFactoryCompte.update({ id:obj.id }, obj, function(savedObj) {
        $scope.resultat = savedObj;
       }, function(error) {
        $scope.resultat = error.data.error;
       });
    };
    console.log('ok 6');
  });
