// To run the example:
// node main.js --config=./examples/config

var
	amdPath = 'AMD Unit',
	params,
	requirejs = require('./node_modules/requirejs/bin/r');

global.sinon = require('sinon');
global.chai = require('chai');
global.expect = global.chai.expect;


function getArgs(){
	var
		r = /^\-*/,
		params = {},
		args = process.argv.toString().split(',');
	args = args.splice(2, args.length-1);
	
	args.forEach(function(arg){
		if(arg.indexOf('=')>-1){
			var keyValue = arg.replace(r, '').split('=');
			keyValue[0] = keyValue[0].trim();
			keyValue[1] = keyValue[1].trim();
			if(keyValue[0] === 'c'){ keyValue[0] = 'config'; }
			if(keyValue[0] === 't'){ keyValue[0] = 'tests'; }
			if(keyValue[0] === 's'){ keyValue[0] = 'suites'; }
			params[keyValue[0]] = keyValue[1];
		}
	});
	return params;
}
params = getArgs();

if(!params.config){
	console.log('\nMISSING CONFIG\n');
	console.log('A config file is required. For example: \n\tnode main.js --config=./examples/config');
	console.log('See examples/config or the README for how to create your own config file.\n');
	process.exit(0);
}

requirejs([params.config], function(config){
	//console.log('CONFIG', config);
	var loader = config.loader || {};
	loader.paths = loader.paths || {};
	loader.waitSeconds = loader.waitSeconds || 3;
	//if(!loader.paths['amd-unit']){
	//	loader.paths['amd-unit'] = './' + amdPath;
	//}
	requirejs.config(loader);
	
	if(params.tests || params.suites || config.suites || config.tests){
		requirejs([
			'amd-unit/lib/inject',
			'amd-unit/lib/runner'
		], function(inject, runner){
			console.log('inject', inject);
			inject.init(requirejs);
			runner(requirejs, config, params.tests || params.suites || config.suites || config.tests);
		});	
	}
	else{
		console.log('\nMISSING TESTS\n');
		process.exit(0);
	}
});
