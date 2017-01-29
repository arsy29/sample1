(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {



            $stateProvider
                .state('main', {
                    url: '/billing',
                    abstract: true,
                    templateUrl: 'view/core/core.html',
                    controller: 'CoreController'
                });

            $urlRouterProvider.otherwise(
                '/billing/dashboard'
            );
        }]);
}());