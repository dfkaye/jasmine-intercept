// suite.spec.js

if (typeof require == 'function') {
  require('../jasmine-intercept');
}

describe('jasmine-intercept', function () {

  /*
   * fixture methods
   */
   
  var passing = function () {
    expect(1).toMatch(/1/);
  };

  var failing = function (a, b) {
    expect(a).toBe(b);
  };
  
  /*
   * set up and run tests
   */
   
  beforeEach(function() {

    intercept();
    
  });

  it('should be available as a function', function () {
  
    intercept.clear();

    expect(typeof intercept).toBe('function');
  });

  it('should capture passing spec', function () {

    passing();
    
    intercept.clear();
    
    expect(intercept.passMessages.length).toBe(1);
  });
  
  it('should capture failing spec', function () {

    failing(1, 0);
    
    intercept.clear();
    
    expect(intercept.failMessages.length).toBe(1);
  });

  it('should capture failing spec message', function () {

    var a = 1;
    var b = 2;
    
    failing(1, 2);
    
    intercept.clear();
    
    expect(intercept.failMessages[0]).toBe('Expected ' + a + ' to be ' + b + '.');
  });  
});