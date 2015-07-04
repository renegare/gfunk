module.exports = G;

function assertFunk(funk, message) {
  if(typeof funk !== 'function') {
    throw new Error(message);
  }
}

function G(opts) {
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

      assertFunk(cb, 'You did not provide a function to override');

      function exec(){
        return cb.apply(context, arguments);
      }

      return exec;
    }
  }
}
