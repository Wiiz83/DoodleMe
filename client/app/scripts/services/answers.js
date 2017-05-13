 'use strict';

angular.module('clientApp')
.factory('FactorySlot', function ($resource) {
	return $resource('http://localhost:3000/api/eventAnswers/', {}, {
		create: { 
			method: 'POST'
		},
        update: { 
			url:'http://localhost:3000/api/eventSlots/:id',
			method: 'PUT', 
			params:{idSlot:'@id'} 
		},
		get: { 
			url:'http://localhost:3000/api/eventSlots/:id',
			method: 'GET', 
			params:{idSlot:'@id'} 
		},
		delete: { 
			url:'http://localhost:3000/api/eventSlots/:id',
			method: 'DELETE', 
			params:{idSlot:'@id'} 
		},
		getAll: { 
			url:'http://localhost:3000/api/eventSlots/byEvent/:EventID',
			method: 'GET', 
			params:{EventID:'@id'}, 
			isArray: true, 
			cancellable: true
		}
	});
});

