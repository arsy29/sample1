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
                }
            })

            $scope.colors = ["#8BC34A", "#FFEB3B", "#F44336"];
            $scope.pie = {};
            $scope.pie.labels = ["Paid", "Underpaid", "Unpaid"];

            function renderBillingCompletion(periodId) {
                DashboardService.geCompletion(periodId).then(response => {
                    if (response.data.responseStatus > 0) {
                        let stats = response.data.responseResult;
                        $scope.pie.data = [stats.paid, stats.underpaid, stats.unpaid];
                    }
                })
            }

            $scope.bar = {};
            $scope.bar.series = ["Paid", "Underpaid", "Unpaid"];

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