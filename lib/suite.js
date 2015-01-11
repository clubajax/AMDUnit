define([
	'./reporter',
	'./inject'
], function(reporter, inject){
	
	if(typeof window !== 'undefined'){
		window.global = window;
	}
	
	var
		config = {},
		callback,
		currentSuite;
	
	function complete(){
		if(currentSuite.after){
			currentSuite.after(inject.clean);
		}
		if(callback){
			callback();
		}
	}
	
	function initCurrentSuite(){
		currentSuite = {
			tests: []	
		};
	}
	
	
	function runTest(test){
		if(config.haltOnErrors){
			test.run();
			reporter.testPass(test.name);
		}
		else{
			try{
				test.run();
				reporter.testPass(test.name);
			}catch(e){
				console.error(e.message);
				reporter.testFail(test.name);
			}
		}
		
		
		if(currentSuite.afterEach){
			currentSuite.afterEach(inject.clean);
		}
		
		nextTest();
	}
	
	function run(test){
		if(currentSuite.beforeEach){
			if(currentSuite.beforeEach.length){
				currentSuite.beforeEach(function(path, mocks, callback){
					if(arguments.length){
						inject.load(path, mocks, function(module){
							callback(module);
							runTest(test);
						});	
					}
					else{
						runTest(test);	
					}
				});
			}else{
				currentSuite.beforeEach();
				runTest(test);
			}
		}
		else{
			runTest(test);	
		}
		
		
	}
	
	function nextTest(){
		if(currentSuite.tests.length){
			run(currentSuite.tests.shift());
		}
		else{
			reporter.suiteComplete();
			complete();
		}
	}
	
	function runSuite(){
		reporter.suiteBegin(currentSuite.name);
		
		if(currentSuite.before){
			if(currentSuite.before.length){
				currentSuite.before(function(path, mocks, callback){
					if(arguments.length){
						inject.load(path, mocks, function(module){
							callback(module);
							nextTest();
						});	
					}
					else{
						nextTest();	
					}
				});
			}
			else{
				currentSuite.before();
				nextTest();	
			}
		}
		else{
			nextTest();	
		}
		
		
		
		
		
	}
	
	global.suite = function(s){
		//console.log('load suite of tests...');
		initCurrentSuite();
		Object.keys(s).forEach(function(key){
			if(key === 'name' || key === 'before' || key === 'beforeEach' || key === 'after' || key === 'afterEach'){
				currentSuite[key] = s[key];
			}
			else if(typeof s[key] === 'function'){
				currentSuite.tests.push({
					name: key,
					run: s[key]
				});
			}
		});
		runSuite();
	};
	
	return {
		complete: function(cb){
			callback = cb;
		},
		setConfig: function(_config){
			config = _config;
		}
	};
});