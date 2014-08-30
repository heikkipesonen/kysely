Query.controller('queryAppController', ['$scope','$element', function($scope,$element){
	


	angular.extend($scope, {
		login:true,

	   	getId:function(length){

	   		if (!length) length = 32;
	   		
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < length; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
	});
}]);