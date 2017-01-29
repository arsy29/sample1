(function() {
    'use strict';
    angular.module('bvha2')
        .service('DashboardService', ['$http', 'api', function($http, api) {
            this.geCompletion = function(periodId) {
                return $http.get(api.endpoint + "/dashboard/completion-rate/" + periodId);
            }

            this.getMonthlyCompletionGraph = function(periodId) {
                return $http.get(api.endpoint + "/dashboard/completion-graph/" + periodId);
            }

            this.getCollectionGraph = function(periodId) {
                return $http.get(api.endpoint + "/dashboard/collection-graph/" + periodId);
            }

            this.getOutstanding = function(periodId) {
                return $http.get(api.endpoint + "/dashboard/outstanding/" + periodId);
            }

            this.getDelinquent = function(periodId) {
                return $http.get(api.endpoint + "/dashboard/delinquent/" + periodId);
            }
        }])
}())