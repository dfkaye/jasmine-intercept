jasmine-intercept
=================

[![Build Status](https://travis-ci.org/dfkaye/jasmine-intercept.png)](https://travis-ci.org/dfkaye/jasmine-intercept)

Provides an `intercept()` method for the 
[Jasmine BDD test framework](https://github.com/pivotal/jasmine), in order to 
capture *expected* failures and report them as passed to the jasmine reporter, 
mainly as a shield for continuous integration environments.

Thanks to:
+ Jamon Holmgren (@jamonholmgren) for your feedback regarding this API. 

justify
-------

tl;dr ~ needed this while using jasmine to test-drive my 
[jasmine-where](https://github.com/dfkaye/jasmine-where) repo.

Read [more about that here](https://gist.github.com/dfkaye/7223559).

npm
---

    npm install jasmine-intercept
    
    git clone https://github.com/dfkaye/jasmine-intercept.git

important
---------

Including or requiring `jasmine-intercept` adds an `intercept()` method to the 
**global** environment, for example:

    require('jasmine-intercept');
    
    intercept === global.intercept === jasmine.getEnv().intercept;

    <script -- jasmine 1 or 2 scripts first -->
    <script src="../jasmine-intercept.js"></script>

    intercept === window.intercept === jasmine.getEnv().intercept;

use
---

`intercept` takes a function with a body of expectations and returns a results 
object containing arrays of `failing` and `passing` messages generated by the 
spec runner.

Use `var messages = intercept(function () { 
  // body of spec
})` 
to capture *expected* failures in order to prevent them appearing as failed in 
the jasmine reporter.

Inspect the returned `messages.failing` and `messages.passing` arrays for length 
and content.

examples
--------

Use in an it-eration:

    it('should intercept messages', function () {
          
      var messages = intercept(function() {
        expect(1).toBe(1);
        expect(typeof drink).toBe('mixed'); // should be 'undefined'
      });
      
      expect(messages.failing.length).toBe(1);
      expect(messages.failing[0]).toBe("Expected 'undefined' to be 'mixed'.");
      expect(messages.passing.length).toBe(1);
    });

    
Use in asynchronous it-eration:  
    
    it('should intercept asynchronous messages', function (done) { // <= pass done here
    
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
    
    
jasmine versions supported
--------------------------

Current implementation runs in both jasmine 1.3.1 and jasmine 2.0.0-rc3.

Using jasmine-node which uses jasmine 1.3.1 internally.

    jasmine-node --verbose ./test/suite.spec.js
    
or simply

    npm test
    
Using [testemjs](https://github.com/airportyh/testem) to drive tests in multiple 
browsers for jasmine-2.0.0 (see how to 
[hack testem for jasmine 2](https://github.com/dfkaye/testem-jasmine2)), as well 
as jasmine-node.  The following command uses a custom launcher for jasmine-node 
in testem:

    testem -l j
 