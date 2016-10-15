(function() {
    'use strict';
    angular.module("bvha2")
        .controller('LoginController', ['$scope',
            '$state',
            'LoginService',
            function($scope, $state, loginService) {
                console.log("LoginController");

                $scope.signin = function() {
                    console.log("do signin");
                    if (loginService.signin($scope.username, $scope.password)) {
                        $state.go('main.dashboard');
                    }
                };


            }
        ]);
}())