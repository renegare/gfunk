module.exports = ArrayArgsMatcher;

var StringArgMatcher = require('./string-arg');

function ArrayArgsMatcher(argsMatchers) {
  argsMatchers = argsMatchers.map(function(matcher, n){
    switch(matcher.constructor) {
      case RegExp:
        break;
      case String:
        matcher = new StringArgMatcher(matcher);
        break;
      default:
        throw new Error('Arg index ' + n + ' can only be a regex or a string');
        break;
    }

    return matcher;
  });

  this.test = function(args) {
    var hits = argsMatchers.filter(function(match, n){
        return match.test(args[n]);
      });
      return hits.length === argsMatchers.length;
  }
}
