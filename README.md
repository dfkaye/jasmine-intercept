jasmine-intercept
=================

Provides an `intercept()` method for the 
[Jasmine BDD test framework](https://github.com/pivotal/jasmine).

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

example
-------

    /*
     * set up and run tests
     */
     
    beforeEach(function() {

      intercept();
      
    });

    it('should capture failing spec message', function () {

      var a = 1;
      var b = 2;
      
      // this will be captured
      expect(a).toBe(b);
      
      // turn off the interceptor for this it-eration
      intercept.clear();
      
      // call real expectation
      expect(intercept.failMessages[0]).toBe('Expected ' + a + ' to be ' + b + '.');
    });
    
