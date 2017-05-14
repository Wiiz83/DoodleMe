'use strict';

angular.module('clientApp')
.factory('FactoryEvent', function ($resource) {
	return $resource('http://localhost:3000/api/events/', {}, {
 		close: { 
			 url:'http://localhost:3000/api/events/:id/close/:slotID',
			 method: 'PUT', 
			 params:{id:'@id', slotID:'@slotID'} 
		},
		create: { 
			method: 'POST' 
		},
		delete: {
			url:'http://localhost:3000/api/events/:id',
			method: 'DELETE', 
			params:{id:'@id'}
		},
        update: { 
			url:'http://localhost:3000/api/events/:id',
			method: 'PUT', 
			params:{id:'@id'} 
		},
		get: {
			url:'http://localhost:3000/api/events/:id',
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
		},
		getMyEventsArchived: {
			url:'http://localhost:3000/api/events/archived/createdBy/:id',
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		},
		getMyEventsClosed: {
			url:'http://localhost:3000/api/events/closed/createdBy/:id', 
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		},
		getMyEventsOpened: {
			url:'http://localhost:3000/api/events/open/createdBy/:id', 
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		},
		getMyParticipationsArchived: {
			url:'http://localhost:3000/api/events/upcoming/archived/anweredBy/:id',
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		},
		getMyParticipationsClosed: {
			url:'http://localhost:3000/api/events/upcoming/closed/anweredBy/:id', 
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		},
		getMyParticipationsOpened: {
			url:'http://localhost:3000/api/events/upcoming/open/anweredBy/:id', 
			params:{id:'@id'},
			method: 'GET', 
			isArray: true, 
			cancellable: true
		}
	});
});


