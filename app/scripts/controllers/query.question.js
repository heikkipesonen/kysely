Query.controller('questionController', ['$rootScope','$scope', function($rootScope, $scope){
	

	angular.extend($scope, {
		edit:true,
		questionTypes:$rootScope.questionTypes,

		remove:function(){
			$scope.$parent.$parent.removeQuestion($scope.questionindex);
		},

		toggleEdit:function(){
			$scope.edit = !$scope.edit;
		},

		createAnswer:function(){
			return {
				id:$rootScope.getId(),
				value:null
			}
		},

		addAnswer:function(){
			$scope.question.answers.push( $scope.createAnswer() );
		},


		removeAnswer:function(answerIndex){
			$scope.question.answers.splice(answerIndex,1);
		}
	});

	$scope.$watch('control', function(){
		if ($scope.control === false){
			$scope.edit = false;
		} else {
			$scope.edit = true;
		}
	})

	$scope.addAnswer();
}]);