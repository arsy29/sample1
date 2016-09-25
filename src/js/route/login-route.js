(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$routeProvider', routeConfig]);

    function routeConfig($routeProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'view/login/login.html',
                controller: 'LoginController'
            })
    }
}());