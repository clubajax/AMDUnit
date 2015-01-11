define(['./boom'], function(boom){
	return {
		name: 'zap',
		log: function(){
			console.log('"original zap"');
			boom.log();
		}
	};
});