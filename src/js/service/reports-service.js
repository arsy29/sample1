(function() {
    'use strict';
    angular.module('bvha2')
        .service('ReportsService', ["$http", "api", function($http, api) {
            let config = {
                responseType: 'arraybuffer'
            };
            this.generateBS = function(parameter) {
                return $http.post(api.endpoint + "/reports/billing-statement", parameter, config);
            }

            this.generateBR = function(parameter) {
                return $http.post(api.endpoint + "/reports/billing-reports", parameter, config);
            }

             this.generatePR = function(parameter) {
                return $http.post(api.endpoint + "/reports/payment-reports", parameter, config);
            }


        }])
}())