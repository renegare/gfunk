module.exports = FunctionArgsMatcher;

function FunctionArgsMatcher(cb) {
    this.test = function(args) {
      return cb.apply(null, args);
    }
}
