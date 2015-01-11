define(['./bar'], function(bar){
	return {
		name: 'foo',
		log: function(){
			console.log('"original foo"');
			bar.log();
		}
	};
});