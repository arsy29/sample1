(function() {
    'use strict';
    angular.module('bvha2').
    config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main.reports', {
                url: '/reports',
                abstract: true,
                templateUrl: "view/reports/reports.html",
                controller: "ReportsCoreCtrl"
            })
            .state('main.reports.bs', {
                url: '/billing-statement',
                controller: "ReportsBSCtrl"
            })
            .state('main.reports.br', {
                url: '/billing-reports',
                controller: "ReportsBRCtrl"
            })
            .state('main.reports.pr', {
                url: '/payment-reports',
                controller: "ReportsPRCtrl"
            })
    }])
}())