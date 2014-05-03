/*  
*  here we define more matchers
*
*/


// Checks if the actual object is an instance of the expected type;
// the functional object `expected` can be any ancestor prototype.
//
// Example:
// expects(new Backbone.Model()).toBeInstanceOf(Backbone.Model);
// origin: https://gist.github.com/prantlf/8631877

var CustomMatchers = CustomMatchers || {};


CustomMatchers.toBeInstanceOf = function(util, customEqualityTesters) {
  return {
    compare: function(actual, expected) {
        var result = {};
        result.pass = actual instanceof expected;
        if (result.pass) {
			result.message =  "object "+actual+" is of instance "+expected;
		}
		else {
			result.message = "object "+actual+" is NOT of instance "+expected;;
		}
		return result;
    }
  };
};
CustomMatchers.toBeBoolean = function(util, customEqualityTesters) {
  return {
    compare : function (actual, expected) {
      return {
        pass : (typeof actual === 'boolean'),
        message : 'Expected ' + actual + ' is not boolean'
      };
    }
  };
};