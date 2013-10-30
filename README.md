jasmine-intercept
=================

Provides an `intercept()` method for the 
[Jasmine BDD test framework](https://github.com/pivotal/jasmine), in order to 
capture *expected* failures and report them as passed to the jasmine reporter, 
mainly as a shield for continuous integration environments.

justify
-------

tl;dr ~ needed this while using jasmine to test-drive my 
[jasmine-where](https://github.com/dfkaye/jasmine-where) repo.

Read [more about that here](https://gist.github.com/dfkaye/7223559).

use
---

Use `intercept()` to capture *expected* failures in order to prevent them 
appearing as failed in the reporter.

Call `intercept.clear()` to turn off capturing.

Inspect `intercept.failMessages` and `intercept.passMessages` arrays for length 
and content.

examples
--------

Use in each it-eration:

    it('should capture spec message', function () {

      var a = 1, b = 2;
      
      intercept();  // turn it on..
      
      expect(a).toBe(b); // this will be captured...
      
      expect(typeof intercept).toBe('function'); // ...so will this

      intercept.clear();  // turn it off
      
      // now use real expectation to inspect messages
      
      expect(intercept.failMessages.length).toBe(1);
      expect(intercept.failMessages[0]).toBe('Expected ' + a + ' to be ' + b + '.');
      expect(intercept.passMessages.length).toBe(1);
    });
    
Use in beforeEach():

    /*
     * set up and run tests
     */
     
    beforeEach(function() {
    
      intercept();
      
    });
    
    if ('should work', function () {
    
      var a = 1, b = 2;
            
      expect(a).toBe(b); // this will be captured...
      
      intercept.clear();  // turn it off
      
      // now use real expectation to inspect messages
      
      expect(intercept.failMessages.length).toBe(1);
      expect(intercept.failMessages[0]).toBe('Expected ' + a + ' to be ' + b + '.');
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

    testem -l jasmine-node

    
TODO
----
+ <del>at least one asynchronous test</del>(done)
+ better names for pass/fail message arrays ??
+ NPM publish