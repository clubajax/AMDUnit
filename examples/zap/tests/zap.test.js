define([
		
], function(){
	var
		zap,
		mocks = {
			'amd-unit/examples/zap/src/boom': function(){
				return {
					log: function(){
						console.log('mock *BOOM*');	
					} 
				};
			}
		},
		path = 'amd-unit/examples/zap/src/zap';
		
	
	suite({
		// suite name - used in reports
		name: 'Testing ZAP',
		before: function(load){
			// Example of dependencies and mocks asyncronously loaded
			// before any tests are started
			load(path, mocks, function(module){
				zap = module;
			});
		},
		after: function(unload){
			// Unload our module and mocks from requirejs so as not to affect
			// subsequent suites
			// `unload` is provided in after() and afterEach()
			unload();
		},
		beforeEach: function(){
			// beforeEach is optional
		},
		afterEach: function(){
			// afterEach is optional
		},
		
		// Tests are essentially a hash map.
		// Any method with the name (key) listed above is considered
		// to be a test
		// Tests methods are not provided  any arguments
		'it should have a name of `zap`': function(){
			expect(zap.name).to.equal('zap');
		},
		'it should have a method `log`': function(){
			expect(zap.log).to.be.a('function');
		},
		'it should call `boom.log`': function(){
			var
				boom = require('amd-unit/examples/zap/src/boom'),
				spy = sinon.spy(boom, 'log');
			
			zap.log();
			
			sinon.assert.calledOnce(spy);
			boom.log.restore();
		},
		'it should fail this test': function(){
			expect(1).to.equal('fail');
		},
	});
});