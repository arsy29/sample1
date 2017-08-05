(function() {
    'use strict';
    angular.module('bvha2')
        .controller('EditBillingCtrl', ['$scope', 'BillingService', function($scope, BillingService) {
            console.log('EditBillingCtrl');
            $scope.$parent.mode = 'edit';
            $scope.billing = {};
            var period;

            function init() {
                $scope.isEditable = false;
            }
            init();
            //check for draft
            BillingService.checkForActive().then(function(response) {
                if (response.data.responseMessage = "SUCCCESS" &&
                    response.data.responseResult &&
                    response.data.responseResult.list.length > 0) {
                    period = response.data.responseResult.period;
                    $scope.billing.cutOff = new Date(period.periodCutoff);
                    $scope.billList = response.data.responseResult.list;
                    filter();
                    $scope.originalList = angular.copy($scope.billList);
                }
            });

            $scope.submit = function() {
                if (window.confirm("You are about to submit the changes in billing statements?")) {
                    BillingService.submit($scope.billList, false, period).then(function(response) {
                        console.log(response);
                        if (response.data.responseMessage === "SUCCESS") {
                            $scope.originalList = angular.copy($scope.billList);
                        }
                    }).finally(() => {
                        if (callback)
                            callback();
                    });
                }
            }


            $scope.edit = function() {
                if (window.confirm("Are you sure you want to edit the current billing statement?")) {
                    $scope.isEditable = true;
                }
            }

            $scope.loadMember = function(index) {
                $scope.selected = {
                    index: index,
                    member: $scope.filteredList[index],
                    billing: $scope.filteredList[index],
                    breakdown: []
                }
                if (!$scope.selected.billing.otherAmount) {
                    $scope.selected.billing.otherAmount = 0;
                }
            }

            $scope.$watch("filterKey", function() {
                filter();
            });

            function filter(timeout, callback) {
                $scope.$parent.filter($scope.filterKey, $scope.billList, ['id', 'lName', 'fName'], timeout).then(function(result) {
                    $scope.filteredList = result;
                }).finally(function() {
                    updateIdx();
                    if (callback) {
                        callback();
                    }
                })
            }

            var updateIdx = function() {
                if ($scope.selected) {
                    $scope.selected.index = $scope.filteredList.findIndex(function(data) {
                        return data.id == $scope.selected.member.id;
                    });
                }
            }

            $scope.reset = function() {
                _reset();
            }

            $scope.cancel = function() {
                _reset(() => {
                    $scope.isEditable = false;
                });

            }

            function _reset(callback) {
                $scope.billList = angular.copy($scope.originalList);
                filter(0, function() {
                    $scope.loadMember($scope.selected.index);
                    callback();
                });
            }

            //computation
            function computeWaterConsumption() {
                if ($scope.selected)
                    $scope.selected.billing.totalConsumed = ($scope.selected.billing.currReading || 0) - ($scope.selected.billing.prevReading || 0);
            }

            function breakdownWater() {
                if ($scope.selected)
                    $scope.selected.breakdown = BillingService.getBreakdown($scope.selected.billing.totalConsumed);
            }

            function computeTotalWaterConsumption() {
                if ($scope.selected) {
                    $scope.selected.billing.waterAmount = 0;
                    $scope.selected.breakdown.forEach(function(data) {
                        $scope.selected.billing.waterAmount += data.total;
                    })
                }
            }

            function computeCurrentMonthTotal() {
                if ($scope.selected) {
                    $scope.selected.billing.currentTotal = $scope.selected.billing.assocFee + $scope.selected.billing.waterAmount + ($scope.selected.billing.otherAmount || 0);
                }
            }

            function computeGrandTotal() {
                if ($scope.selected) {
                    $scope.selected.billing.grandTotal = $scope.selected.billing.currentTotal + $scope.selected.billing.remaining;
                    $scope.computed = {
                        grandTotal: $scope.selected.billing.grandTotal
                    }
                }
            }

            //watchers
            $scope.$watch('selected.billing.currReading', computeWaterConsumption);
            $scope.$watch('selected.billing.prevReading', computeWaterConsumption);
            $scope.$watch('selected.billing.totalConsumed', breakdownWater);
            $scope.$watch('selected.billing.totalConsumed', computeTotalWaterConsumption);
            $scope.$watch('selected.billing.waterAmount', computeCurrentMonthTotal);
            $scope.$watch('selected.billing.otherAmount', computeCurrentMonthTotal);
            $scope.$watch('selected.billing.currentTotal', computeGrandTotal);

        }])
}())