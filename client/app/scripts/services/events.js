'use strict';

angular.module('clientApp')
.factory('FactoryEvents', function ($resource) {
	return $resource('http://localhost:3000/api/events/', {}, {
 		close: { 
			 url:'http://localhost:3000/api/events/:id/close/:slotID',
			 method: 'PUT', 
			 params:{id:'@id', slotID:'@slotID'} 
		},
		create: { 
			method: 'POST' 
		},
        update: { 
			url:'http://localhost:3000/api/events/:id',
			method: 'PUT', 
			params:{id:'@id'} 
		},
		get: {
			method: 'GET', 
			params:{id:'@id'}, 
			cancellable: true 
		},
		addSlot: { 
			method: 'POST', 
			params:{id:'@id'} 
		},
		getAll: { 
			method: 'GET', 
			isArray: true, 
			cancellable: true
		}
	});
});


