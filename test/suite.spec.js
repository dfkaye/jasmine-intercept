// suite.spec.js

if (typeof require == 'function') {
  require('../jasmine-intercept');
}

describe('jasmine-intercept', function () {

  /*
   * fixture methods
   */
   
  function passing() {
    expect(1).toMatch(/1/);
  };

  function failing(a, b) {
    expect(a).toBe(b);
  };
  
  
  describe('used in beforeEach()', function() {
  
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
  
  
  describe('used in it-erations', function () {
  
    it('should pass', function() {
      passing();
    });
    
    it('should fail', function() {
      failing();
    });
    
    it('should intercept pass', function() {
      intercept();
      passing();
      intercept.clear();
      expect(intercept.passMessages.length).toBe(1);
    });
    
    it('should intercept fail', function() {
      intercept();
      failing(1, 0);
      intercept.clear();
      expect(intercept.failMessages.length).toBe(1);      
    });
    
    it('should intercept in multiple setup and clear steps', function() {
      intercept();
      failing(1, 0);
      intercept.clear();
      expect(intercept.failMessages.length).toBe(1); 
      
      // not recommended but can be done without side-effects
      
      intercept();
      failing(33, 45);
      intercept.clear();
      expect(intercept.failMessages.length).toBe(1); 
    });    
  });
});