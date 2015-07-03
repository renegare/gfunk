module.exports = G;

function G(opts) {
  return {
    funk: function(cb){
      return function exec(){
        return cb();
      }
    }
  }
}
