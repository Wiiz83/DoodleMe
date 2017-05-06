'use strict';

angular.module('clientApp')
.factory('userService', function ($resource) {
	return $resource('http://localhost:3000/users', {}, {
		create: { method: 'POST' },
	});
});
