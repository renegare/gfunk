describe('flow of execution', function(){
  describe('happy path', function() {
    var execSpy1 = sinon.spy(),
      execSpy2 = sinon.spy(function(cb, param1){
        cb('G is ' + param1);
      }),
      execSpy3 = sinon.spy(),
      originalFunk = sinon.spy(function(){
        return 'something';
      }),
      funked = G([
          {match: ['foo'], exec: execSpy1},
          {match: [/^G/], exec: execSpy2},
          {match: ['Great'], exec: execSpy3}
        ]).funk(originalFunk),
      returnVal
      ;

    before(function(){
      returnVal = funked('Great');
    });

    it('should return orignal callback return value', function(){
        returnVal.should.equal('something');
    });

    it('should call only the first matching exec', function(){
      execSpy2.should.have.been.called;
      execSpy1.should.not.have.been.called;
      execSpy3.should.not.have.been.called;
    });

    it('should call the original function with the modified arguments', function(){
        originalFunk.should.have.been.calledWith('G is Great');
    });
  });

  describe('when an exception occurs', function() {
    var execSpy = sinon.spy(function(cb, param1){
        throw new Error('Something went wrong G');
      }),
      originalFunk = sinon.spy(),
      funked = G([
          {match: [/^G/], exec: execSpy},
        ]).funk(originalFunk)
      ;

    it('should not call original function when exception is thrown in handler', function() {
      (function(){
        funked('Great');
      }).should.throw('Something went wrong G');

      originalFunk.should.not.have.been.called;
    });
  });
});
