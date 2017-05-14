 'use strict';

angular.module('clientApp')
.factory('FactoryNotifications', function ($resource) {
	return $resource('http://localhost:3000/api/notifications/', {}, {

		markAsRead: { 
            url:'http://localhost:3000/api/notifications/markasread/',  // POST: {eventID, userID}
			method: 'POST'
		},

        getAll : {
            url:'http://localhost:3000/api/notifications/user/:userID',
			method: 'GET', 
			params:{userID:'@id'}, 
			isArray: true, 
			cancellable: true
        },
        
        getCompteur : {
            url:'http://localhost:3000/api/notifications/user/:userID/count',
			method: 'GET', 
			params:{userID:'@id'}
        }
	});
});

