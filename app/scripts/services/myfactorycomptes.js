'use strict';

/**
 * @ngdoc service
 * @name doodleMeApp.MyFactoryComptes
 * @description
 * # MyFactoryComptes
 * Factory in the doodleMeApp.
 */
angular.module('doodleMeApp')
  .factory('MyFactoryComptes', function () {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function () {
        return meaningOfLife;
      }
    };
  });
