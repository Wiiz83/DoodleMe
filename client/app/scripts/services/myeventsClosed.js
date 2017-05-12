'use strict';

angular.module('clientApp')
.factory('FactoryMyEventsClosed', function ($resource) {
	return $resource('http://localhost:3000/api/events/closed/createdBy/:id', {}, {
		get: { method: 'GET', params:{id:'@id'}, cancellable: true },
		getAll: { method: 'GET', params:{id:'@id'}, isArray: true, cancellable: true}
	});
});


