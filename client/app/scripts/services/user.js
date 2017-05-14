 'use strict';

angular.module('clientApp')
.factory('FactoryUser', function ($resource) {
	return $resource('http://localhost:3000/api/users/', {}, {
        update: { 
			url:'http://localhost:3000/api/users/:id',
			method: 'PUT', 
			params:{id:'@id'} 
		},
		get: { 
			url:'http://localhost:3000/api/users/:id',
			method: 'GET', 
			params:{id:'@id'} 
		},
		delete: { 
			url:'http://localhost:3000/api/users/:id',
			method: 'DELETE', 
			params:{id:'@id'} 
		}
	});
});

