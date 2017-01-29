(function() {
    'use strict';
    angular.module('bvha2')
        .controller('GenerateBillingCtrl', ['$scope', 'BillingService', function($scope, BillingService) {
            console.log('GenerateBillingCtrl');
            $scope.mode = 'generate';
            $scope.billing = {};
            var period;

            function init() {
                $scope.isEditable = false;
                $scope.isGenerate = false;
                $scope.isEdit = false;
            }
            init();

            //check for draft
            BillingService.checkForDraft().then(function(response) {
                if (response.data.responseMessage = "SUCCCESS" &&
                    response.data.responseResult &&
                    response.data.responseResult.list.length > 0) {
                    $scope.isEditable = true;
                    $scope.isGenerate = true;
                    period = response.data.responseResult.period;
                    $scope.billing.cutOff = new Date(period.periodCutoff);
                    $scope.billList = response.data.responseResult.list;
                    filter();
                    $scope.originalList = $scope.$parent.deepCopy($scope.billList);
                }
            })

            $scope.generate = function() {
                if (window.confirm("Are you sure want to generate billing statement for next month? Doing this will automatically archive current billing month and prevent changes of any kind.")) {
                    $scope.isEditable = true;
                    $scope.isGenerate = true;
                    BillingService.generateBilling().then(function(response) {
                        period = response.data.responseResult.period;
                        $scope.billing.cutOff = new Date(period.periodCutoff);
                        $scope.billList = response.data.responseResult.list;
                        filter();
                        $scope.originalList = $scope.$parent.deepCopy($scope.billList);
                    })
                }
            }

            $scope.cancel = function() {
                if (window.confirm("Are you sure you want cancel current changes?")) {
                    $scope.billList = $scope.$parent.deepCopy($scope.originalList);
                    filter(0, function() {
                        $scope.loadMember($scope.selected.index);
                    });
                }
            }

            $scope.saveAsDraft = function(callback) {
                if (window.confirm("Are you sure you want to save changes as a draft?"))
                    submit("S");
            }

            $scope.submit = function() {
                submit("A", init);
            }

            function submit(status, callback) {
                if (window.confirm("You are about to submit the final billing statements?")) {
                    period.status = status;
                    BillingService.submit($scope.billList, period.id ? false : true, period).then(function(response) {
                        console.log(response);
                        if (response.data.responseMessage === "SUCCESS") {
                            if (callback)
                                callback(response);

                            $scope.originalList = $scope.$parent.deepCopy($scope.billList);
                        }
                        if (callback)
                            callback();
                    });
                }
            }

            $scope.reset = function() {
                if (window.confirm("Are you sureyou want to revert to initial data?")) {
                    BillingService.reset().then(response => {
                        if (response.data.responseMessage === "SUCCESS") {
                            $scope.billList = response.data.responseResult;
                            filter(0, () => $scope.loadMember($scope.selected.index));
                        }
                    })
                }
            }


            $scope.loadMember = function(index) {
                $scope.selected = {
                    index: index,
                    member: $scope.filteredList[index],
                    billing: $scope.filteredList[index],
                    breakdown: []
                }

                $scope.selected.billing.otherAmount = 0;
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