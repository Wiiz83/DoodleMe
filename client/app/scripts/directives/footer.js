'use strict';

 angular.module('clientApp')
 .directive('footer', function () {
 	return {
        restrict: 'A',
 		templateUrl: 'views/directives/footer.html',
        scope: true,
        transclude : false,
       // controller: 'FooterController'
 	};
 });
