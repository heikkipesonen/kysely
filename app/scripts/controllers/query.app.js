Query.controller('queryAppController', ['$rootScope','$scope','$element', function($rootScope, $scope,$element){
	
	angular.extend($rootScope,{
		login:true,
		
		questionTypes:['text','radio','checkbox','textarea'],

	   	getId:function(length){

	   		if (!length) length = 32;

		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < length; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
	});

	angular.extend($scope, {

	});
}]);