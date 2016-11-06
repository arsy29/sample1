(function() {
    'use strict';
    angular.module("bvha2")
        .service('BillingService', ["$http", function($http) {
            var endpoint = "/endpoint";
            var service = {};

            service.getBillingYear = function() {
                return $http.get(endpoint + "/billing/periodYear");
            }

            service.getPeriodByYear = function(year) {
                return $http.get(endpoint + "/billing/periodByYear/" + year);
            }

            service.getMemberBillList = function(periodId) {
                return $http.get(endpoint + "/billing/memberBillList/" + periodId);
            }
            service.getDetails = function(memebrId, periodId) {
                return $http.get(endpoint + "/billing/details/" + periodId + "/" + memebrId);
            }


            return service;
        }])
}());