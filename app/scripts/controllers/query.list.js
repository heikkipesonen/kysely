Query.controller('listController', ['$rootScope','$scope','$http', function($rootScope, $scope, $http){
	
	angular.extend($scope, {
		list:[],
		listFilter:'',

		createNew:function(){
			$scope.list.push({
				name:'pere',
				text:'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam a euismod diam. Quisque luctus volutpat pretium. Aenean porttitor massa at euismod commodo. Vestibulum turpis elit, mollis nec rhoncus tempus, pretium ut tellus. Integer tincidunt libero vitae libero blandit luctus. Maecenas et felis interdum, tincidunt turpis nec, ultricies enim. Maecenas ut placerat neque, cursus ultricies velit.',
				id:$rootScope.getId()
			});
		},

		getList:function(){

		}
	});

	$scope.createNew();
	$scope.createNew();
	$scope.createNew();
	$scope.createNew();

}])