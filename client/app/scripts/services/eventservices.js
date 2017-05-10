'use strict';

angular.module('clientApp')
.factory('eventService', function ($resource) {
	return $resource('http://localhost:3000/api/events', {}, {
		create: { method: 'POST' },
        update: { method: 'PUT', params:{id:'@id'} },
		get: { method: 'GET', params:{id:'@id'} },
		addSlot: { method: 'POST', params:{id:'@id'} },
		getAll: { method: 'GET', isArray: true, cancellable: true}
	});
});


