describe('override', function(){
  var logger = {}, spy
    ;

  beforeEach(function(){
    spy = sinon.spy();
    logger.log = spy;
  });

  it('should call original method with original context', function(){
    var originalFunc = logger.log;
    logger.log = G().funk(logger.log.bind(logger));
    logger.log.should.not.eql(originalFunc);

    var args = faker.lorem.words();
    logger.log.apply(logger, args);
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledOn(logger);
    spy.should.have.been.calledWith.apply(spy.should.have.been, args);
  });

  it('should call original method with undefined context', function(){
    var newFunk = G().funk(spy);
    newFunk.should.not.eql(spy);
    newFunk('Hey whats up ...?');
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledOn(undefined);
  });

  it('should call original method with passed in context', function(){
    var originalFunc = logger.log;
    G().funk(logger, 'log');
    logger.log.should.not.eql(originalFunc);
    logger.log('Hey whats up ...?');
    spy.should.have.been.calledOnce;
    spy.should.have.been.calledOn(logger);
  });

  it('should throw an error when arity is 1 and yet the arg is not a function', function(){
      (function(){
        G().funk(faker.lorem.words())
      }).should.throw('You did not provide a function to override');
  });

  it('should throw an error when arity is 2 and yet the 2nd arg is not a name of an existent function', function(){
      var unknownMethod = faker.lorem.words(1).join('');
      (function(){
        G().funk(logger, unknownMethod)
      }).should.throw(unknownMethod + ' could not be found');
  });

});
