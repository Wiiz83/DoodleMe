'use strict';

angular.module('clientApp')
.factory('FactoryEvent', function ($resource) {
	return $resource('http://localhost:3000/api/events/:id', {}, {
		getEvent: { method: 'GET', params:{id:'@id'}, cancellable: true}, 
        updateEvent: {method: 'PUT', params:{id:'@id'}},
		deleteEvent: {method: 'DELETE', params:{id:'@id'}}
	});
});

