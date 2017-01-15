(function() {
    'use strict';
    angular.module('bvha2')
        .service('ReportsService', ["$http", "api", function($http, api) {

            this.generateReportsBS = function(parameter) {
                return $http.post(api.endpoint + "/reports/billing-statement", parameter, {
                    responseType: 'arraybuffer'
                });
            }

        }])
}())