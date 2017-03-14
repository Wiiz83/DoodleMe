'use strict';

describe('Service: MyFactoryComptes', function () {

  // load the service's module
  beforeEach(module('doodleMeApp'));

  // instantiate service
  var MyFactoryComptes;
  beforeEach(inject(function (_MyFactoryComptes_) {
    MyFactoryComptes = _MyFactoryComptes_;
  }));

  it('should do something', function () {
    expect(!!MyFactoryComptes).toBe(true);
  });

});
