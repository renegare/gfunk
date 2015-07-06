module.exports = AlwaysBooleanMatcher;

function AlwaysBooleanMatcher(boolean) {
  this.test = function() {
    return !!boolean;
  }
}
