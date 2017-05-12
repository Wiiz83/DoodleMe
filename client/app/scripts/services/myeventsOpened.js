'use strict';

angular.module('clientApp')
.factory('FactoryMyEventsOpened', function ($resource) {
	return $resource('http://localhost:3000/api/events/open/createdBy/ ', {}, {
		get: { method: 'GET', params:{id:'@id'}, cancellable: true },
		getAll: { method: 'GET', params:{id:'@id'}, isArray: true, cancellable: true}
	});
});


