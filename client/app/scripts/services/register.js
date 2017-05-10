'use strict';

angular.module('clientApp')
.factory('FactoryRegister', function ($resource) {
    return $resource('http://localhost:3000/api/register');
});