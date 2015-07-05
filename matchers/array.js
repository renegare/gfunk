module.exports = ArrayArgsMatcher;

function ArrayArgsMatcher(argsMatchers) {
  this.test = function(args) {
    var hits = argsMatchers.filter(function(match, n){
        return match.test(args[n]);
      });
      return hits.length === argsMatchers.length;
  }
}
