define({
	
	// Configuration options for the module loader; any AMD configuration options supported by the specified AMD loader
    // can be used here
    loader: {
        // Packages that should be registered with the loader in each testing environment
        //baseUrl: !!this.process ? '' : '../../'
		baseUrl: '../',
		paths:{
			'amd-unit': './AMDUnit'
		}
	},
	
	// Where the results of the tests print.
	// Currently only 'console' is supprted.
	reporters: ['console'],
	
	haltOnErrors: false,
    
    // Unit test suites
    suites: [
		'amd-unit/examples/foo/tests/foo.test',
		'amd-unit/examples/zap/tests/zap.test'
    ]
	
});