kysely

	.controller('thanksController', ['$scope', function($scope){

	}])

	.controller('loginController', ['$scope','login', function($scope,login){
		$scope.user = login;
	}])

	.controller('usersController', ['$scope','login','$http','idGenerator', function($scope,login,$http, idGenerator){
		angular.extend($scope,{
			login:login,
			users:null,
			getList:function(){
				$http.get(REST_URL+'/list/users').success(function(data){
					$scope.users = data;
				})
			},
			newuser:{
				password:'',
				username:''
			},
			generatePassword:function(){
				$scope.newuser.password = idGenerator.id(10);
			},
			createUser:function(){
				$scope.login.create($scope.newuser.username, $scope.newuser.password).success(function(){
					$scope.newuser.password  = '';
					$scope.newuser.username = '';

					$scope.getList();
				});

			}
		});

		$scope.getList();
	}])


	.controller('browseController', ['$scope','login','$http', function($scope,login,$http){
		

	}])

	.controller('mainController', ['$scope','login','$http', function($scope,login,$http){

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

	