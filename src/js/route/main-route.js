(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {



            $stateProvider
                .state('main', {
                    url: '/billing',
                    abstract: true,
                    templateUrl: 'view/core/core.html',
                    controller: 'CoreController'
                });

            $routeProvider.otherwise({
                redirectTo: '/login'
            });
        }]);
}());