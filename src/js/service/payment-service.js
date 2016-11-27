(function() {
    'use strict';
    angular.module("bvha2")
        .service("PaymentService", ["$http", function($http) {
            var endpoint = "/endpoint";
            var service = {};

            this.getPaymentsById = function(billingId) {
                return $http.get(endpoint + "/payment/payments/" + billingId);
            }

            this.addOrEditPaymentsToId = function(payment) {
                return $http.post(endpoint + "/payment/persist", payment);
            }

            this.deletePaymentsById = function(paymentId) {
                return $http.get(endpoint + "/payment/delete/" + paymentId);
            }

        }])
}())