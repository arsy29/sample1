(function() {
    'use strict';
    angular.module('bvha2').
    config(['$stateProvider', function($stateProvider) {

        $stateProvider
            .state('main.reports', {
                url: '/reports',
                abstract: true,
                templateUrl: "view/reports/reports-core.html",
                controller: "ReportsCoreCtrl"
            })
            .state('main.reports.bs', {
                url: '/billingstatement',
                templateUrl: "view/reports/reports-bs.html",
                controller: "ReportsBSCtrl"
            })
            .state('main.reports.br', {
                url: '/billingstatement',
                templateUrl: "view/reports/reports-br.html",
                controller: "ReportsBRCtrl"
            })
            .state('main.reports.pr', {
                url: '/billingstatement',
                templateUrl: "view/reports/reports-pr.html",
                controller: "ReportsPRCtrl"
            })
    }])
}())