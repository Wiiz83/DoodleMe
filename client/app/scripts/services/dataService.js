'use strict';

 angular.module('clientApp')
.service('dataService', function() {
  var mydata = "";

  var setData = function(data) {
      mydata = data;
  };

  var getData = function(){
      return mydata;
  };

  return {
    setData: setData,
    getData: getData
  };

});