'use strict';

angular.module('clientApp')
.factory('FactoryLogin', function ($resource) {
    return $resource('http://localhost:3000/api/login');
});

