'use strict';

angular.module('clientApp')
.factory('FactoryEvent', function ($resource) {
	return $resource('http://localhost:3000/api/event/:id', {}, {
		getEvent: { method: 'GET', params:{id:'@id'}, isArray: true, cancellable: true}, 
        update: {method: 'PUT'}
	});
});

