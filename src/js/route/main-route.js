(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$routeProvider', function($routeProvider) {
            console.log("otherwise route loaded");
            $routeProvider.otherwise({
                redirectTo: '/login'
            })
        }]);


}());