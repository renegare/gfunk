module.exports = StringArgMatcher;

function StringArgMatcher(string) {
  this.test = function(arg) {
    return string === arg;
  }
}
