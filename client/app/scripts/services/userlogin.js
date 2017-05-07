'use strict';

angular.module('clientApp')
.factory('userLogin', function ($resource) {
    return $resource('http://localhost:3000/api/login');
});

