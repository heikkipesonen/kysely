var REST_URL = 'http://192.168.0.10/kysely/backend';

var Query = angular.module('kysely',['ngResource','ngRoute','ngResource','duScroll'])
   
   .config(['$routeProvider',

        function($routeProvider) {
            $routeProvider

                .when('/', {
                    templateUrl: 'templates/query.view.main.html',
                    controller: ''
                })
                
                .when('/edit', {
                    templateUrl: 'templates/query.view.list.html',
                    controller: 'listController'
                })

                .when('/edit/:id', {
                    templateUrl: 'templates/query.view.edit.html',
                    controller: 'editController'
                })

                .when('/start', {
                    templateUrl: 'templates/query.view.start.html',
                    controller: 'startController'
                })

                .when('/users', {
                    templateUrl: 'templates/query.view.users.html',
                    controller: 'usersController'
                })

                .when('/analytics', {
                    templateUrl: 'templates/query.view.analytics.html',
                    controller: 'analyticsController'
                })


                 .otherwise({
                    redirectTo: '/'
                });
    }]);