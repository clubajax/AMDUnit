define([], function(){
	
	var
		chalk,
		log,
		suites = 0,
		totalTests = 0,
		totalTestsPass = 0,
		totalTestsFail = 0,
		currentTests = 0,
		currentTestsPass = 0,
		currentTestsFail = 0,
		style;
		
	
	if(typeof process !== 'undefined'){
		chalk = require('chalk');
		style = {
			suiteBegin: chalk.magenta.bold,
			suiteComplete: chalk.gray.italic,
			testFail: chalk.red,
			testPass: chalk.cyan,
			complete: chalk.magenta
		};
		log = function(txt, color){
			console.log(style[color](txt));
		};
	}else{
		style = {
			suiteBegin: 'color: magenta; font-weight: bold; font-size: 14px;',
			suiteComplete: 'color: gray;',
			testFail: 'color: red;',
			testPass: 'color: blue;',
			complete: 'color: magenta;'
		};
		log = function(txt, color){
			console.log('%c' + txt, style[color]);	
		};
	}
	
	
	function suiteBegin(name){
		log('\n  ' + name, 'suiteBegin');
		currentTestsPass = 0;
		currentTestsPass = 0;
		currentTestsFail = 0;
		suites++;
	}
	function suiteComplete(){
		log('  ' + currentTestsPass + ' of ' + currentTests + ' passed', 'suiteComplete');
	}
	function testFail(name){
		log('    ' + name, 'testFail');
		totalTests++;
		currentTests++;
		currentTestsFail++;
		totalTestsFail++;
	}
	function testPass(name){
		log('    ' + name, 'testPass');
		totalTests++;
		currentTests++;
		currentTestsPass++;
		totalTestsPass++;
		
	}
	function complete(){
		log('  ' + totalTestsPass + ' of ' + totalTests + ' total tests passed', 'complete');
		log('  ' + totalTestsFail + ' tests failed', 'complete');
	}
	
	return {
		suiteBegin: suiteBegin,
		suiteComplete: suiteComplete,
		testPass: testPass,
		testFail: testFail,
		complete: complete
	};	
});


// https://github.com/sindresorhus/chalk
//Modifiers
//
//reset
//bold
//dim
//italic (not widely supported)
//underline
//inverse
//hidden
//strikethrough (not widely supported)


//Colors
//
//black
//red
//green
//yellow
//blue (on Windows the bright version is used as normal blue is illegible)
//magenta
//cyan
//white
//gray


//Background colors
//
//bgBlack
//bgRed
//bgGreen
//bgYellow
//bgBlue
//bgMagenta
//bgCyan
//bgWhite

//exports.symbols = {
//  ok: '✓',
//  err: '✖',
//  dot: '․'
//};
//
//// With node.js on Windows: use symbols available in terminal default fonts
//if ('win32' == process.platform) {
//  exports.symbols.ok = '\u221A';
//  exports.symbols.err = '\u00D7';
//  exports.symbols.dot = '.';
//}