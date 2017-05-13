 'use strict';

angular.module('clientApp')
.factory('FactoryAnswer', function ($resource) {
	return $resource('http://localhost:3000/api/eventAnswers/', {}, {
        update: { 
			method: 'PUT'
		},
		get: { 
			url:'http://localhost:3000/api/eventAnswers/:id',
			method: 'GET', 
			params:{idSlot:'@id'} 
		}
	});
});

