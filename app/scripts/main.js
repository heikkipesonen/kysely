var REST_URL = 'http://192.168.0.10/kysely/backend';

var kysely = angular.module('kysely',['ngResource','ngRoute','ngResource','duScroll'])
   
   .service('idGenerator', function(){
	   	this.id = function(length){
		    var text = "";
		    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

		    for( var i=0; i < length; i++ )
		        text += possible.charAt(Math.floor(Math.random() * possible.length));

		    return text;
		}
   })

   .config(['$routeProvider',

        function($routeProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: 'templates/main.html',
                    controller: 'mainController'
                })
                
                .when('/create', {
                    templateUrl: 'templates/create.html',
                    controller: 'editController'
                })

                 .otherwise({
                    redirectTo: '/'
                });
    }])

	.factory('Query',['$http','$resource','login',function($http,$resource,login){
		return $resource('http://192.168.0.10/kysely/backend/:userid/:slug', {
			userid:login.id,
			slug:'@slug'
		}, {
			create:{
				method:'POST',
				params:{
					slug:'create'					
				}				
			},
			reply:{
				method:'POST',
				params:{
					userid:'response',
					slug:'@slug'
				}
			}
		});
	}]);