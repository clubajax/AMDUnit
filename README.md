# AMD Unit

## Features

* Asyncronously loads AMD files to be tested
* Works in a browser or in Node
* Unlike other frameworks, you can run **all** of your suites in the browser. Node is not required!
* Dependency injection made easy
* sinon and chai comes included

## Description

AMD Unit is a simple unit testing framework, best used for personal and small open source projects.

AMD Unit was created out of frustration of a lack of support by the popular unit testing frameworks
for requirejs. None of the major frameworks, Mocha, Jasmine, nor QUnit support it without major
modifications and a great deal of initial set up time. (For an idea of the unecessary pain, see
[Mocha Bootstrap](https://github.com/clubajax/mocha-bootstrap)). Incredibly, even
[theintern](http://theintern.io/), which was designed specifically for AMD, doesn't easily handle
asyncronous loading. 

By design, AMD Unit lacks some features needed for corporate use. It only has a console reporter,
it is not set up to run with Grunt or Gulp, and there are no hooks for coverage nor continuous
integration.

What it does have is dependency injection, an easy setup, and all of your tests and suites will run
seemlessly in a browser or in Node.

It comes free with chai and sinon, which are optional to use.

## Installation

You can clone the repository with your generic clone commands as a standalone repository or
submodule.

	git clone git://github.com/clubajax/AMDUnit.git
	
Then run: `npm install`

## Usage

### Suites

A suite is a single file, wrapped in an AMD `define`, that (usually) tests one project file.

There is a single, global function to use: `suite()` which accepts a single argument of a "suite",
which is a hash map of unit tests.

Your suite can contain any or all of the following built-in methods:

	before(load)
		// Called before the tests are run. Passes an function that can optionally be
		// used, `load()` that asyncronously loads your files (see below)
	beforeEach(load)
		// Like `before()` but runs before each test. Also has the `load()` function
		// available.
	after(unload)
		// Runs after all tests have run. Passes an function that can optionally be used,
		//`unload()` which unregisters the test file and any mocks from requirejs.
	afterEach(unload)
		// Like `after()` but runs after each test. Also has an `unload()` function
		// available.

`load` accepts two or three parameters. If two, the first should be a path to the test file, and the
second is the callback. 
	
	load('amd-unit/examples/foo/src/foo', function(module){
		FooTest = module;
	});

If three parameters are used, the first should be a path to the test file, the third is the
callback, and the second is a hash map of dependencies to be mocked. Note that the path to the file
to be mocked needs to be an absolute path as requirejs sees it. Sometimes experimentation is
necessary to get them to work, but this is not a limitation of AMD Unit.
	
	var mocks = {
		'amd-unit/examples/foo/src/bar': function(){}
	};
	load('amd-unit/examples/foo/src/foo', mocks, function(module){
		FooTest = module;
	});
	
While the tests themselves are not run asyncronously, each test or all the tests are not run until
they `before` and `beforeEach` have finished their async calls.

Since the tests are not run async, if there are timers in your code, you should use a mechanism that
shifts time, like [sinon.clock](http://sinonjs.org/)

### Tests

It is recommended to pass the result of the `before` or `beforeEach` to a scoped variable that can
be used in the tests. The tests are key-values in the suite hash map, with the key being the name
of the test, and the value being the function to run the test.

	define([], function(){
		var FooTest;
		suite({
			beforeEach: function(load){
				load('amd-unit/examples/foo/src/foo', function(module){
					FooTest = module;
				});
			},
			'first test:': function(){
				var foo = new FooTest();
				expect(foo.name).to.equal('foo');
			},
			'second test:': function(){
				var foo = new FooTest('custom');
				expect(foo.name).to.equal('custom');
			}
		});

### Config

See the `/examples` folder for an example of a config file and how unit tests are to be set up.

The trickiest part of any AMD project is getting the config right so requirejs can find all
the files. Where ever `/AMDUnit` is placed, it should be within the same root folder (`/src` below).
as the project to be tested. Assuming the ideal situation of a folder structure such as:

	/src
	  /AMDUnit
	  /project
	    /tests
	      /foo
	        foo.test.js
	      /bar
	        bar.test.js

Since the starting point is the `/AMDUnit/runner.html` or `/AMDUnit/main.js` (for Node.js) the
paths should be relative to the `/AMDUnit` folder. The config file would need to set the baseUrl
to point to `/src`, and then there should be a `paths` setting for the `AMDUnit` folder, set to
`amd-unit` (needed internaly). It is optional to set additonal paths for test files. `suites` is
an array of paths pointing to test files.
	
	config = {
		loader: {
			baseUrl: '../',
			paths:{
				'amd-unit': './AMDUnit',
				'foo': './project/tests/foo'
			}
		},
		suites: [
			'foo/foo.test.js'
			'./project/tests/bar/bar.test.js'
		]
	};
	
	
## Running the Tests

`runner.html` needs to be run from a local server. Due to the XHR calls, it will not run from a file
path unless you change the security settings in your browser.

To run in the browser, load `AMDUnit/runner.html`, passing the path to your config file as a query
parameter, such as:

	http://localhost/AMDUnit/runner.html?config=./examples/config

To run in Node, navigate to the AMDUnit directory and run the main.js file passing the config as a
parameter:
	
	node main.js --config=./examples/config
	
## Contributing	

If you wish to contribute to AMD Unit, they are welcome! Simply fork the repo and give me a pull
request.

	
## License

This is free and unencumbered software released into the public domain.

Anyone is free to copy, modify, publish, use, compile, sell, or
distribute this software, either in source code form or as a compiled
binary, for any purpose, commercial or non-commercial, and by any
means.

In jurisdictions that recognize copyright laws, the author or authors
of this software dedicate any and all copyright interest in the
software to the public domain. We make this dedication for the benefit
of the public at large and to the detriment of our heirs and
successors. We intend this dedication to be an overt act of
relinquishment in perpetuity of all present and future rights to this
software under copyright law.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE,
ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
OTHER DEALINGS IN THE SOFTWARE.

For more information, please refer to <http://unlicense.org/>