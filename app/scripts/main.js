var REST_URL = 'http://192.168.0.10/kysely/backend';

var Query = angular.module('kysely',['ngResource','ngRoute','ngResource','duScroll'])
   
   .config(['$routeProvider',

        function($routeProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: 'templates/query.view.main.html',
                    controller: ''
                })
                
                .when('/create', {
                    templateUrl: 'templates/query.view.edit.html',
                    controller: 'editController'
                })

                 .otherwise({
                    redirectTo: '/'
                });
    }]);