(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider
                .state('main.viewBilling', {
                    url: '/view',
                    templateUrl: 'view/billing/billing.html',
                    controller: 'ViewBillingCtrl'
                })
                .state('main.editBilling', {
                    url: '/edit',
                    templateUrl: 'view/billing/billing.html',
                    controller: 'EditBillingCtrl'
                })
                .state('main.generateBilling', {
                    url: '/generate',
                    templateUrl: 'view/billing/billing.html',
                    controller: 'GenerateBillingCtrl'
                })

        }]);
}())