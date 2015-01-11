define([], function(){
	var
		foo,
		mocks = {
			'amd-unit/examples/foo/src/bar': function(){
				return {
					log: function(){
						console.log('mocked bar');	
					} 
				};
			}
		},
		path = 'amd-unit/examples/foo/src/foo';
		
	suite({
		// suite name - used in reports
		name: 'Testing Foo',
		before: function(){
			// before is optional	
		},
		after: function(){
			// after is optional	
		},
		beforeEach: function(load){
			// Example of dependencies and mocks asyncronously loaded
			// before *each* test is started
			load(path, mocks, function(module){
				foo = module;
			});
		},
		afterEach: function(unload){
			// Unload our module and mocks from requirejs so as not to affect
			// subsequent tests
			// `unload` is provided in after() and afterEach()
			unload();
		},
		
		// Tests are essentially a hash map.
		// Any method with the name (key) listed above is considered
		// to be a test
		// Tests methods are not provided  any arguments
		'foo test 1': function(){
			expect(foo.name).to.equal('foo');
			
			// testing that module reloads for next test
			foo.name = 'WRONG';
		},
		'foo test 2': function(){
			// foo.name should not be 'WRONG'
			expect(foo.name).to.equal('foo');
		},
		'foo test 3': function(done){
			var
				bar = require('amd-unit/examples/foo/src/bar'),
				spy = sinon.spy(bar, 'log');
			
			foo.log();
			
			sinon.assert.calledOnce(spy);
			bar.log.restore();
		}
	});
});