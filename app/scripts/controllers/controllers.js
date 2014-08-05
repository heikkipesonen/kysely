var REST_URL = 'http://192.168.0.10/kysely/backend';
kyselyControllers
	.controller('thanksController', ['$scope', function($scope){

	}])

	.controller('mainController', ['$scope','login','$http', function($scope,login,$http){
		$http.get(REST_URL+'/list/'+login.getLogin())
			.success(function(data){
				$scope.list = data;
			})

	}])

	.controller('answerController', ['$scope','Query','$routeParams','$http','$location', function($scope,Query,$routeParams,$http,$location){

		$scope.makeid = function(){
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < 32; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}

		$scope.edit = false;
		$scope.query = Query.get({slug:$routeParams.slug});
		$scope.date = Date.now();

		$scope.instance_id = $scope.makeid();

		$scope.reply = function(){
			//$scope.query.$reply({id:$scope.query.slug});


			$http
				.post(REST_URL+'/reply/'+$scope.query.slug+'/'+$scope.instance_id,$scope.query)
				.success(function(response){
					$location.path('/kiitos');
				})

				.error(function(response){		});
		}
	}])

	.controller('editController', ['$routeParams','$scope','Query','$window','$timeout', function($routeParams,$scope,Query,$window,$timeout){
		if ($routeParams.slug){
			$scope.query = Query.get({slug:$routeParams.slug});
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