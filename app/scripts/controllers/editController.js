kysely.controller('editController', 
	['$routeParams','$scope','Query','$window','$timeout','idGenerator', 
		function($routeParams,$scope,Query,$window,$timeout,idGenerator){
	
		if ($routeParams.slug){
			$scope.query = Query.get({slug:$routeParams.slug});
		} else {
			$scope.query = new Query();
		}

		var autoSave = false;
		$scope.$watch('query',function(){

			if (autoSave){
				$timeout.cancel(autoSave);
			}

			autoSave = $timeout(function(){
				$scope.query.$save();
			},3000);

		},true);



		angular.extend($scope,{
			edit:true,
			addQuestion:function(type){
				if (!$scope.query.questions){
					$scope.query.questions = [];
				}

				var q = {
					name:idGenerator.id(8),
					compose:true,
					label:null,
					type:type,
					answers:null
				};

				$scope.query.questions.push(q);
				$scope.addAnswer($scope.query.questions.length-1);
				

				try{

					$timeout(function(){			
						var view = $('.query-view'),
							e = $('#'+q.name);

						view.scrollToElement(e,null,300)
					});
				} catch(e){

				}

				return $scope.query.questions.indexOf(q);
			},
			removeQuestion:function(index){
				$scope.query.questions.splice(index, 1);
			},

			removeAnswer:function(questionIndex, answerIndex){
				$scope.query.questions[questionIndex].answers.splice(answerIndex, 1);
			},

			addAnswer:function(index){
				if (!$scope.query.questions[index].answers){
					$scope.query.questions[index].answers = [];
				}

				$scope.query.questions[index].answers.push({
					name:idGenerator.id(8),
					label:null,
					value:null
				});
			},	
			saveQuery : function(){
				$scope.query.$save();
			},

			toggleEdit : function(){
				$scope.edit = !$scope.edit;
			}
		});
	}]);