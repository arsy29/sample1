(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$stateProvider', routeConfig]);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'view/login/login.html',
                controller: 'LoginController'
            })
    }
}());