(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$routeProvider', '$stateProvider', function($routeProvider, $stateProvider) {
            
            $routeProvider.otherwise({
                redirectTo: '/login'
            });

            $stateProvider
                .state('main', {
                    url: '/billing',
                    abstract: true,
                    templateUrl: 'view/core/core.html',
                    controller: 'CoreController'
            });
        }]);
}());