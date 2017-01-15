(function() {
    'use strict';
    angular.module("bvha2")
        .service('BillingService', ["$http", "api", function($http, api) {
            // var api.endpoint = "/api.endpoint";
            // var api.endpoint = "http://localhost:8080/billing-service";

            this.getBillingYear = function() {
                return $http.get(api.endpoint + "/billing/periodYear");
            }

            this.getPeriodByYear = function(year) {
                return $http.get(api.endpoint + "/billing/periodByYear/" + year);
            }

            this.getMemberBillList = function(periodId) {
                return $http.get(api.endpoint + "/billing/memberBillList/" + periodId);
            }
            this.getDetails = function(memebrId, periodId) {
                return $http.get(api.endpoint + "/billing/details/" + periodId + "/" + memebrId);
            }

            this.getBreakdown = function(amount) {
                if (!amount) {
                    return [];
                }
                var rules = [{
                    description: "1st 10 cu.m",
                    treshold: 10,
                    amount: 40
                }, {
                    description: "11-30 cu.m",
                    treshold: 30,
                    amount: 45
                }, {
                    description: "31+ cu.m",
                    amount: 50
                }];
                var breakdown = [];
                var remaining = amount;
                for (var i = 0; i < rules.length; i++) {
                    var range = i == 0 ? rules[i].treshold : rules[i].treshold - rules[i - 1].treshold;
                    if (rules[i].treshold && remaining > range) {
                        remaining -= range;
                        breakdown.push({
                            description: rules[i].description,
                            cubic: range,
                            amount: rules[i].amount,
                            total: range * rules[i].amount
                        });
                    } else {
                        breakdown.push({
                            description: rules[i].description,
                            amount: rules[i].amount,
                            cubic: remaining,
                            total: remaining * rules[i].amount
                        });
                        break;
                    }
                };

                return breakdown;

            }

            this.generateBilling = function() {
                return $http.get(api.endpoint + '/billing/generate/');
            }

            this.submit = function(list, isNew, period) {
                return $http.post(api.endpoint + '/billing/Submit', {
                    list: list,
                    isNew: isNew,
                    period: period
                });
            }

            this.checkForDraft = function() {
                return $http.get(api.endpoint + '/billing/checkForDraft');
            }

            this.generatePeriod = function() {
                return $http.post(api.endpoint + '/billing/generatePeriod');
            }

            this.reset = function() {
                return $http.get(api.endpoint + '/billing/reset');
            }




        }])
}());