
describe('override', function(){
  var logger = {}, spy
    ;

  beforeEach(function(){
    spy = sinon.spy();
    logger.log = spy;
  });

  it('should call original method with original context', function(){
    logger.log = G().funk(logger.log.bind(logger));
    logger.log('Hey whats up ...?');
    spy.should.have.been.calledOnce;
  });

});
