define([
	'./inject',	
	'./suite',	
	'./reporter'
	
], function(inject, suite, reporter){
	
	//console.log('runner loaded');
	
	function loadTest(test){
		require([test]);
	}
	
	function suiteComplete(){
		reporter.complete();
	}
	
	return function(requirejs, config, tests){
		inject.init(requirejs);
		suite.setConfig(config);
		tests = Array.isArray(tests) ? tests : [tests];
		
		suite.complete(function(){
			if(tests.length){
				loadTest(tests.shift());		
			}
			else{
				suiteComplete();
			}
		});
		loadTest(tests.shift());
		
	};
});