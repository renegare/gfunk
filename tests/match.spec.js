describe('matching args to callbacks', function() {

  describe('using boolean', function() {
    var execSpy = sinon.spy()
    ;

    beforeEach(function(){
      execSpy.reset();
    });

    it('should match if set to true', function() {
      var funked = G([{
            match: true,
            exec: execSpy
          }]).funk()
        ;
      funked.apply(null, faker.lorem.words());
      execSpy.should.have.been.calledOnce;
    });

    it('should not match if set to false', function() {
      var funked = G([{
            match: false,
            exec: execSpy
          }]).funk()
        ;
      funked.apply(null, faker.lorem.words());
      execSpy.should.not.have.been.calledOnce;
    });
  });

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

  describe('using array of regex and/or strings', function(){
    var execSpy = sinon.spy(),
      funked = G([
        {
          match: [/foo/, /^bar/, 'gfunk'],
          exec: execSpy
        }
      ]).funk()
      ;

    beforeEach(function(){
      execSpy.reset();
    });

    it('should match strings', function() {
      funked('foo', 'baratt', 'gfunk');
      execSpy.should.have.been.calledOnce;
    });

    it('should not match strings', function() {
      funked('foo', 'zbar', 'gfunk');
      execSpy.should.not.have.been.called;
    });

    it('should not match non string type', function() {
      funked({}, 'zbar', 'gfunk');
      execSpy.should.not.have.been.called;
    });

    it('should not match incorrect static string', function() {
      funked('foo', 'baratt', 'afunk');
      execSpy.should.not.have.been.called;
    });
  });

  describe('using incorrect match types', function() {
    it('should throw an error when match is undefined', function() {
        (function(){
          G([
            {match: true, exec: noop},
            {match: false, exec: noop},
            {match: undefined, exec: noop}
          ])
        }).should.throw('Bad matcher definition in index 2; You can only use Function, Array of regexs or a static Booloean')
    });

    it('should throw an error when array contains something other than a regex', function(){
        (function(){
          G([
            {match: true, exec: noop},
            {match: [['Not Cool'], 'good', /great/], exec: noop},
            {match: false, exec: noop}
          ])
        }).should.throw('Bad matcher definition in index 1; Arg index 0 can only be a regex or a string');
    });
  });
});
