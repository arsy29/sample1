(function() {
    'use strict';
    angular.module('bvha2')
        .controller('DashboardCtrl', ['$scope', 'DashboardService', 'BillingService', 'Constant', function($scope, DashboardService, BillingService, Constant) {
            console.log('DashboardCtrl');
            $scope.month = Constant.month;
            BillingService.getBillingYear().then(response => {
                if (response.data.responseStatus > 0) {
                    $scope.yearList = response.data.responseResult;
                    $scope.year = $scope.yearList[0];
                }
            });
            $scope.$watch('year', newValue => {
                BillingService.getPeriodByYear(newValue).then(response => {
                    if (response.data.responseStatus > 0) {
                        $scope.periodList = response.data.responseResult;
                        $scope.period = $scope.periodList[0];
                    }
                })
            })
            $scope.$watch('period', newValue => {
                if (newValue) {
                    $scope.cutOff = new Date(newValue.periodCutOff);
                    renderBillingCompletion(newValue.id);
                    renderMonthlyCollection(newValue.id);
                    renderMonthlyCompletion(newValue.id);
                    getTopOutstanding(newValue.id);
                    getTopDelinquent(newValue.id);
                    renderMonthsRevenue(newValue.id);
                }
            })

            $scope.colors = ["#8BC34A", "#FFEB3B", "#F44336"];
            $scope.pie = {};
            $scope.pie.labels = ["Paid", "Underpaid", "Unpaid"];
            $scope.pie.options = {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }

            function renderBillingCompletion(periodId) {
                DashboardService.getCompletion(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        let stats = response.data.responseResult;
                        $scope.pie.data = [stats.paid, stats.underpaid, stats.unpaid];
                    }
                })
            }

            $scope.colors = ["#8BC34A", "#FFEB3B", "#F44336"];
            $scope.pie2 = {};
            $scope.pie2.options = {
                legend: {
                    display: true,
                    position: 'bottom'
                }
            }

            function renderMonthsRevenue(periodId) {
                DashboardService.getRevenue(periodId).then(response => {
                    if (response.data.responseStatus > 0 && response.data.responseResult && response.data.responseResult.length > 0) {
                        let labels = [];
                        let data = [];
                        for (let payment of response.data.responseResult) {
                            let status = Constant.TransactionType[payment.paymentType];
                            let item = labels.find((label, idx) => {
                                if (label === status.description) {
                                    data[idx]++;
                                    return true;
                                } else {
                                    return false;
                                }
                            });
                            if (!item) {
                                labels.push(status.description);
                                data.push(1);
                            }
                        }
                        $scope.pie2.labels = labels;
                        $scope.pie2.data = data;
                    } else {
                        $scope.pie2.labels = ["No payment yet"];
                        $scope.pie2.data = [0];
                    }
                })
            }

            $scope.bar = {};
            $scope.bar.series = ["Paid", "Underpaid", "Unpaid"];
            $scope.bar.options = {
                legend: {
                    display: true
                }
            }

            function renderMonthlyCompletion(periodId) {
                DashboardService.getMonthlyCompletionGraph(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        $scope.bar.data = [
                            [],
                            [],
                            []
                        ];
                        $scope.bar.labels = [];
                        response.data.responseResult.forEach(data => {
                            $scope.bar.labels.push(data.periodDate)
                            $scope.bar.data[0].push(parseFloat(data.paid));
                            $scope.bar.data[1].push(parseFloat(data.underpaid));
                            $scope.bar.data[2].push(parseFloat(data.unpaid));
                        })
                    }
                })
            }



            $scope.line = {};
            $scope.line.series = ['Collection'];

            function renderMonthlyCollection(periodId) {
                DashboardService.getCollectionGraph(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        console.log(response.data.responseResult);
                        $scope.line.labels = [];
                        $scope.line.data = [response.data.responseResult.map(data => {
                            $scope.line.labels.push(data.periodDate);
                            return data.amount;
                        })];
                    }
                });
            }

            function getTopOutstanding(periodId) {
                DashboardService.getOutstanding(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        $scope.outstanding = response.data.responseResult;
                    }
                })
            }

            function getTopDelinquent(periodId) {
                DashboardService.getDelinquent(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        $scope.delinquent = response.data.responseResult;
                    }
                })
            }


        }]);
}());