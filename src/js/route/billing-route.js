(function() {
    'use strict';
    angular.module('bvha2')
        .config(['$stateProvider', function($stateProvider) {

            $stateProvider
                .state('main.billing', {
                    url: '/billing',
                    abstract: true,
                    templateUrl: "view/billing/billing.html"
                })
                .state('main.billing.view', {
                    url: '/view',
                    controller: 'ViewBillingCtrl'
                })
                .state('main.billing.edit', {
                    url: '/edit',
                    controller: 'EditBillingCtrl'
                })
                .state('main.billing.generate', {
                    url: '/generate',
                    controller: 'GenerateBillingCtrl'
                })

        }]);
}())