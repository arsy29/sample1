(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$stateProvider', function($stateProvider) {
            $stateProvider
                .state('main.payments', {
                    url: '/payments',
                    templateUrl: 'view/payments/payments.html',
                    controller: 'PaymentsCtrl'
                })
        }])
}());