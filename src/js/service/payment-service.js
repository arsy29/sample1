(function() {
    'use strict';
    angular.module("bvha2")
        .service("PaymentService", ["$http", function($http) {
            var endpoint = "/endpoint";
            var service = {};

            service.getPaymentsById = function(billingId) {
                return $http.get(endpoint + "/payment/payments/" + billingId);
            }

            return service;
        }])
}())