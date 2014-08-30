Query.controller('editController', ['$rootScope','$scope','query', function($rootScope, $scope, query){
	
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

	$scope.create();


	console.log($scope.query)
}]);