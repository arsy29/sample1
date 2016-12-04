(function() {
    'use strict';
    angular.module("bvha2")
        .service("PaymentService", ["$http", "api", function($http, api) {
            // api.var endpoint = "/api.endpoint";
            // var api.endpoint = "http://localhost:8080/billing-service";
            var service = {};

            this.getPaymentsById = function(billingId) {
                return $http.get(api.endpoint + "/payment/payments/" + billingId);
            }

            this.addOrEditPaymentsToId = function(payment) {
                return $http.post(api.endpoint + "/payment/persist", payment);
            }

            this.deletePaymentsById = function(paymentId) {
                return $http.get(api.endpoint + "/payment/delete/" + paymentId);
            }

        }])
}())