kyselyControllers
	.controller('mainController', ['$scope', function($scope){

	}])

	.controller('answerController', ['$scope','Query','$routeParams','$http', function($scope,Query,$routeParams,$http){

		$scope.edit = false;
		$scope.query = Query.get({id:$routeParams.question_id});
		$scope.date = Date.now();

		$scope.reply = function(){
			//$scope.query.$reply({id:$scope.query.slug});

			$http({
				url:'http://192.168.0.10/kysely/backend/reply/'+$scope.query.slug,
				method:'post',
				data:$scope.query
			}).then(function(response){

			},function(response){

			})
		}
	}])

	.controller('editController', ['$routeParams','$scope','Query','$window','$timeout', function($routeParams,$scope,Query,$window,$timeout){
		if ($routeParams.question_id){
			$scope.query = Query.get({id:$routeParams.question_id});
		} else {
			$scope.query = new Query();
		}
		$scope.old = angular.copy($scope.query);
		$scope.date = Date.now();
		$scope.edit = true;
		$scope.showToggle = true;

		$scope.saveQuestion = function(){
			$scope.query.$save();
		}

		$scope.toggleEdit = function(){
			$scope.edit = !$scope.edit;
		}

		$scope.removeQuestion = function(index){
			$scope.query.questions.splice(index, 1);
		}

		$scope.removeAnswer = function(questionIndex, answerIndex){
			$scope.query.questions[questionIndex].answers.splice(answerIndex, 1);
		}

		$scope.addAnswer = function(index,type){
			if (!$scope.query.questions[index].answers){
				$scope.query.questions[index].answers = [];
			}

			$scope.query.questions[index].answers.push({
				name:null,
				label:null,
				value:null
			});
		}

		$scope.addQuestion = function(){
			if (!$scope.query.questions){
				$scope.query.questions = [];
			}

			$scope.query.questions.push({
				name:null,
				label:null,
				type:'text',
				answers:null
			});

			$scope.addAnswer($scope.query.questions.length-1);
			
			$timeout(function(){
				$window.scrollTo(0,$window.document.body.scrollHeight);
			},100);
		}

		$scope.submit = function(){
			$scope.query.submitDate = Date.now();
		}
	}])