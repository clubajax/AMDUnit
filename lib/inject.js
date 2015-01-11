define([], function(){
	
	var
		requirejs,
		currentPath,
		currentMocks;
	
	function inject (mocks){
		currentMocks = mocks;
		Object.keys(mocks).forEach(function(path){
			var factory = mocks[path];
			if(requirejs.define){
				requirejs.define(path, factory);
			}else{
				define(path, factory);
			}
		});
	}
	
	function load (path, mocks, callback){
		if(typeof mocks === 'function'){
			callback = mocks;
			mocks = false;
		}
		
		if(mocks){
			inject(mocks);
		}
		
		requirejs([path], function(module){
			callback(module);
		});
		currentPath = path;
	}
	
	function clean (){
		if(requirejs.undef){
			requirejs.undef(currentPath);
		}else{
			require.undef(currentPath);
		}
		if(currentMocks){
			Object.keys(currentMocks).forEach(function(path){
				if(requirejs.undef){
					requirejs.undef(path);
				}else{
					require.undef(path);
				}
			});
		}
		
	}
	
	return {
		init: function(_requirejs){
			requirejs = _requirejs;
		},
		clean: clean,
		load: load,
		inject: inject
	};
	
});