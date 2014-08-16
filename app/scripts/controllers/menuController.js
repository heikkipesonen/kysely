kysely.controller('menuController', ['$scope','$location','$element', function($scope, $location, $element){
	
	$scope.currentPath = $location.url();
	$scope.$on('$routeChangeStart',function(){
		$scope.currentPath = $location.url();
	});
}])