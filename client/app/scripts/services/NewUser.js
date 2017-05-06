'use strict';

angular.module('clientApp')
.factory('NewUser', function ($resource) {
     return $resource('http://localhost:8080/compte/:id', { id: '@_id' }, {
        update: {
          method: 'PUT' // this method issues a PUT request
        }
      });
  });

