var kyselyControllers = angular.module('kyselyControllers', []);

var kysely = angular.module('kysely',['kyselyControllers','ngResource','ngRoute','ngResource'])
   .config(['$routeProvider',

        function($routeProvider) {
            $routeProvider            
                .when('/', {
                    templateUrl: 'templates/main.html',
                    controller: 'mainController'
                })

                .when('/uusi', {
                    templateUrl: 'templates/create.html',
                    controller: 'editController'
                })

                .when('/muokkaa/:question_id', {
                    templateUrl: 'templates/create.html',
                    controller: 'editController'
                })

                .when('/kysely/:question_id', {
                    templateUrl: 'templates/answer.html',
                    controller: 'answerController'
                })

                .otherwise({
                    redirectTo: '/'
                });
    }])

  	.service('login', ['$http', function($http){
  		this.getLogin = function(){
  			return 13;
  		}

  		this.login = function(username, password){
  			return true;
  		}

  	}])

	.factory('Query',['$http','$resource','login',function($http,$resource,login){
		return $resource('http://192.168.0.10/kysely/backend/:userid/:id', {
			userid:login.getLogin(),
			id:'@id'
		}, {
			create:{
				method:'POST',
				params:{
					id:'create'					
				}				
			},
			reply:{
				method:'POST',
				params:{
					userid:'response',
					id:'@id'
				}
			}
		});
	}])

	.directive('footer',function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'templates/footer.html',
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	})

	.directive('question', function(){
		// Runs during compile
		return {
			// name: '',
			// priority: 1,
			// terminal: true,
			// scope: {}, // {} = isolate, true = child, false/undefined = no change
			// controller: function($scope, $element, $attrs, $transclude) {},
			// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
			restrict: 'E', // E = Element, A = Attribute, C = Class, M = Comment
			// template: '',
			templateUrl: 'templates/question.html',
			replace: true,
			// transclude: true,
			// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
			link: function($scope, iElm, iAttrs, controller) {
				
			}
		};
	});