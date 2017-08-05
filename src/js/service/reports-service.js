(function() {
    'use strict';
    angular.module('bvha2')
        .service('ReportsService', ["$http", "api", function($http, api) {
            let config = {
                responseType: 'arraybuffer'
            };
            let currentXHR;
            this.getCurrentXHR = function() {
                let tempCurrentXHR = currentXHR;
                currentXHR = null;
                return tempCurrentXHR;
            }
            this.generateBS = function(parameter) {
                return new Promise((resolve, reject) => {
                    currentXHR = reject;
                    $http.post(api.endpoint + "/reports/billing-statement", parameter, config)
                        .then(resolve)
                        .catch(reject);
                });

            }

            this.generateBR = function(parameter) {
                return new Promise((resolve, reject) => {
                    currentXHR = reject;
                    $http.post(api.endpoint + "/reports/billing-reports", parameter, config)
                        .then(resolve)
                        .catch(reject);
                });
            }

            this.generatePR = function(parameter) {
                return new Promise((resolve, reject) => {
                    currentXHR = reject;
                    $http.post(api.endpoint + "/reports/payment-reports", parameter, config)
                        .then(resolve)
                        .catch(reject);
                });
            }


        }])
}())