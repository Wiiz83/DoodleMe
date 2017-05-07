'use strict';

angular.module('clientApp')
.factory('userRegister', function ($resource) {
    return $resource('http://localhost:3000/api/register');
});