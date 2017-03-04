(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$urlRouterProvider', '$stateProvider', function($urlRouterProvider, $stateProvider) {



            $stateProvider
                .state('main', {
                    url: '/bvha',
                    abstract: true,
                    templateUrl: 'view/core/core.html',
                    controller: 'CoreController'
                });

            $urlRouterProvider.otherwise(
                '/bvha/dashboard'
            );
        }]);
}());