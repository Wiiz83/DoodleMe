 'use strict';

angular.module('clientApp')
.factory('FactorySlot', function ($resource) {
	return $resource('http://localhost:3000/api/eventSlots/', {}, {
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
		},
		getFull: {
			url:'http://localhost:3000/api/eventSlots/byEvent/:EventID/user/:UserID',
			method: 'GET', 
			params:{EventID:'@id', UserID:'@id'},
			isArray: true, 
			cancellable: true 
		},
		getRecommandedSlots: { 
			url:'http://localhost:3000/api/eventSlots/recommanded/:EventID',
			method: 'GET', 
			isArray: true, 
			params:{EventID:'@id'}
		},

		getNegatives: { 
			url:'http://localhost:3000/api/eventSlots/:id/usersAnswers/negative',
			method: 'GET', 
			isArray: true, 
			params:{id:'@id'} 
		},

		getPositives: { 
			url:'http://localhost:3000/api/eventSlots/:id/usersAnswers/positive',
			method: 'GET', 
			isArray: true, 
			params:{id:'@id'} 
		}

	});
});

