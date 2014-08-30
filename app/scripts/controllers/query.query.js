Query.controller('queryController', ['$rootScope','$scope','$timeout', function($rootScope,$scope,$timeout){
		
	
	angular.extend($scope,{
		edit:true,
		createQuestion:function(type){
			if (type===undefined || $rootScope.questionTypes.indexOf(type) === -1) type="text";

			return {
				id:$rootScope.getId(),
				name:'',
				text:'',
				title:'',
				type:type,
				answers:[]
			};

		},

		toggleEdit:function(){
			$scope.edit = !$scope.edit;
		},

		addQuestion:function(type){
			var q = $scope.createQuestion(type);
			$scope.query.questions.push( q );

			$timeout(function(){
				try{				
					var e = $('#'+q.id);
					$('#view').scrollToElement( e, null, 300 )
				} catch(e){

				}
			});
		},


		removeQuestion:function(index){
			$scope.query.questions.splice(index,1);
		},

		save:function(){
			console.log($scope.query)
		}

	});


}]);