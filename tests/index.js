var path = require('path')
  sinon = require('sinon'),
  chai = require('chai'),
  sinonChai = require('sinon-chai'),
  faker = require('faker')
  ;

global.rootRequire = function(){
  var module = path.join(__dirname, '..' , 'lib', arguments[0] || 'index');
  return require(module);
}

global.G = rootRequire();
global.faker = faker;
global.noop = function() {};

chai.should();
chai.use(sinonChai);
