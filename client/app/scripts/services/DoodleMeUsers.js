'use strict';

angular.module('clientApp')
.factory('DoodleMeUsers',function ($resource) {
 return $resource('http://localhost:8080/comptes/');
});
