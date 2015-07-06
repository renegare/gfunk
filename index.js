module.exports = G;

var ArrayArgsMatcher = require('./matchers/array-args'),
  FunctionArgsMatcher = require('./matchers/function-args'),
  AlwaysBooleanMatcher = require('./matchers/always-boolean')
;

function assertFunk(funk, message) {
  if(!funk || funk.constructor !== Function) {
    throw new Error(message);
  }
}

/**
 * Representing ...
 * @function
 * @param {Object[]} matchers
 * @param {Object} opts
 */
function G(matchers, opts) {
  matchers = matchers || [];
  opts = opts || {};

  matchers.map(function(matcher, n){
    try {
      switch(matcher.match || matcher.match === false? matcher.match.constructor : undefined) {
        case Array:
          matcher.match = new ArrayArgsMatcher(matcher.match);
          break;
        case Function:
          matcher.match = new FunctionArgsMatcher(matcher.match);
          break;
        case Boolean:
          matcher.match = new AlwaysBooleanMatcher(matcher.match);
          break;
        default:
           throw new Error('You can only use Function, Array of regexs or a static Booloean');
      }
    } catch(err) {
      throw new Error('Bad matcher definition in index ' + n + '; ' + err.message);
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
