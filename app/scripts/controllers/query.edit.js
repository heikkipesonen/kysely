Query.controller('editController', ['$rootScope','$scope','query','$routeParams', function($rootScope, $scope, query, $routeParams){
	
	angular.extend($scope, {
		query: null,
		edit:true,


		create:function(){
			$scope.query = new query();
			$scope.query.id  = $rootScope.getId();
			$scope.query.questions = [];
		},


		save:function(){

		}


	});
console.log($routeParams)
	$scope.create();


	console.log($scope.query)
}]);