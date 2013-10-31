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
  
  describe('used in it-erations', function () {
  
    it('should pass', function() {
      passing();
    });
    
    it('should fail', function() {
      failing();
    });
    
    it('should throw when param is not a function', function() {
    
      expect(function () {
        intercept();
      }).toThrow();
      
    });
    
    it('should intercept passing messages', function() {
      var messages = intercept(passing);
      
      expect(messages.passing.length).toBe(1);
    });
    
    it('should intercept failing messages', function() {
      var messages = intercept(function() {
        failing(1, 0);
      });
      expect(messages.failing.length).toBe(1);      
    });
    
    it('should intercept multiple times in one step definition', function() {
    
      var messages = intercept(function() {
        failing(1, 0);
      });
      expect(messages.failing.length).toBe(1); 
           
      var messages2 = intercept(function() {
        failing(33, 45);
      });
      expect(messages2.failing.length).toBe(1); 
    });
    
    it('should intercept passing and failing messages', function () {
    
      var messages = intercept(function() {
        expect(1).toBe(1);
        expect(typeof drink).toBe('mixed'); // should be 'undefined'
      });
      
      expect(messages.failing.length).toBe(1);
      expect(messages.failing[0]).toBe("Expected 'undefined' to be 'mixed'.");
      expect(messages.passing.length).toBe(1);
    });
    
  });
  
  describe('asynchronous it-erations', function () {
  
    it('should pass', function(done) {
    
      setTimeout(function () {
      
        passing();
        done();
        
      }, 500);    
      
    });
    
    it('should fail', function(done) {
      
      setTimeout(function () {
      
        failing();
        done();
        
      }, 500); 
    });
    
    it('should intercept passing messages', function(done) {
    
      setTimeout(function () {
      
        var messages = intercept(passing);
               
        expect(messages.passing.length).toBe(1);
        
        done();
        
      }, 500);
    });
    
    it('should intercept failing messages', function(done) {
      
      setTimeout(function () {
      
        var messages = intercept(function() {
        
          failing('foo', 'bar');
        
        });
        
        expect(messages.failing.length).toBe(1); 
        
        done();
        
      }, 500);   
    });
    
    it('should intercept passing and failing messages', function (done) { // <= pass done here
    
      setTimeout(function () {
      
        var messages = intercept(function() {
          expect(1).toBe(1);
          expect(typeof drink).toBe('mixed'); // should be 'undefined'
        });
        
        expect(messages.failing.length).toBe(1);
        expect(messages.failing[0]).toBe("Expected 'undefined' to be 'mixed'.");
        expect(messages.passing.length).toBe(1);
        
        done(); // <= call done here
        
      }, 500);
    });
  });  
});