 'use strict';

angular.module('clientApp')
.factory('FactorySlot', function ($resource) {
	return $resource('http://localhost:3000/api/eventSlots/', {}, {
		create: { method: 'POST'},
        update: { method: 'PUT', params:{idSlot:'@id'} },
		get: { method: 'GET', params:{idSlot:'@id'} },
		delete: { method: 'DELETE', params:{idSlot:'@id'} },
		getAll: { method: 'GET', params:{idEvent:'@id'}, isArray: true, cancellable: true}
	});
});0