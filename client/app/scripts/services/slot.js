 'use strict';

angular.module('clientApp')
.factory('FactorySlot', function ($resource) {
	return $resource('http://localhost:3000/api/eventSlots/', {}, {
		create: { 
			method: 'POST'
		},
        update: { 
			method: 'PUT', 
			params:{idSlot:'@id'} 
		},
		get: { 
			url:'http://localhost:3000/api/eventSlots/:id',
			method: 'GET', 
			params:{idSlot:'@id'} 
		},
		delete: { 
			method: 'DELETE', 
			params:{idSlot:'@id'} 
		},
		getAll: { 
			url:'http://localhost:3000/api/eventSlots/byEvent/:id',
			method: 'GET', 
			params:{EventID:'@id'}, 
			isArray: true, 
			cancellable: true
		}
	});
});

