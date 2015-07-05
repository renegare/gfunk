module.exports = G;

var ArrayArgsMatcher = require('./matchers/array'),
  FunctionArgsMatcher = require('./matchers/function')
;

function assertFunk(funk, message) {
  if(typeof funk !== 'function') {
    throw new Error(message);
  }
}

function G(matchers, opts) {
  matchers = matchers || [];
  opts = opts || {};

  matchers.map(function(matcher){
    switch(matcher.match.constructor) {
      case Array:
        matcher.match = new ArrayArgsMatcher(matcher.match);
        break;
      case Function:
        matcher.match = new FunctionArgsMatcher(matcher.match);
        break;
      default:
        throw "WTF!?";
    }

    return matcher;
  });

  return {
    funk: function(context, cb){
      if(arguments.length === 1) {
        cb = context;
        context = undefined;
      }

      if(context) {
        var cbName = cb;
        cb = context[cb];
        assertFunk(cb, cbName + ' could not be found');
        context[cbName] = exec;
      }

      if(arguments.length === 0) {
        cb = function(){};
      }

      assertFunk(cb, 'You did not provide a function to override');

      function exec(){
        var returnVal, args = arguments;

        function realExec() {
          return cb.apply(context, args);
        }

        var matched = !!matchers.filter(function(matcher){
          return matcher.match.test(args);
        })
        .map(function(matcher){
          matcher.exec.apply(matcher, args);
          returnVal = realExec();
        }).length;

        if(!matched) {
          returnVal = realExec();
        }

        return returnVal;
      }

      return exec;
    }
  }
}
