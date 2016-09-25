(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$stateProvider', routeConfig]);

    function routeConfig($stateProvider) {
        $stateProvider
            .state('main.members', {
                url: '/members',
                templateUrl: 'view/member/member.html',
                controller: 'MemberController'
            })
    }
}());