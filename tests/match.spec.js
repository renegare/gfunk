describe('matching args to callbacks', function() {

  describe('using callback!?', function(){
    var execSpy = sinon.spy(),
      funked = G([
        {
          match: function(arg1) { return !!arg1; },
          exec: execSpy
        }
      ]).funk()
      ;

    beforeEach(function(){
      execSpy.reset();
    });

    it('should match if cb returns true', function() {
      funked(true);
      execSpy.should.have.been.calledOnce;
    });

    it('should not match if cb returns false', function() {
      funked(false);
      execSpy.should.not.have.been.called;
    });
  });


  describe('using regex', function(){
    var execSpy = sinon.spy(),
      funked = G([
        {
          match: [/foo/, /^bar/],
          exec: execSpy
        }
      ]).funk()
      ;

    beforeEach(function(){
      execSpy.reset();
    });

    it('should match strings', function() {
      funked('foo', 'bar');
      execSpy.should.have.been.calledOnce;
    });

    it('should not match strings', function() {
      funked('foo', 'zbar');
      execSpy.should.not.have.been.called;
    });

    it('should not match non string type', function() {
      funked({}, 'zbar');
      execSpy.should.not.have.been.called;
    });
  });
});
