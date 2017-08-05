(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsBSCtrl', ['$scope', '$state', 'BillingService', '$localStorage', 'ReportsService',
            function($scope, $state, BillingService, $localStorage, ReportsService) {
                console.log('ReportsBSCtrl');
                console.log($state);
                $scope.$parent.mode = 'bs';
                $scope.reports = $localStorage.reports;
                $scope.filename = "Billing Statement.pdf"
                $scope.$parent.trustedURL = null;
                $scope.$watch('period', (newVal, oldVal) => {
                    if (newVal) {
                        $scope.periodCutOff = new Date($scope.period.periodCutOff);
                        if ($scope.isManual) {
                            BillingService.getMemberBillList($scope.period.id)
                                .then(response => {
                                    $scope.memberList = response.data.responseStatus ? response.data.responseResult : [];
                                    filter($scope.test);
                                }).catch(error =>
                                    console.log(error)
                                )
                        }
                    }
                })

                $scope.$watch('filterKey', function(newVal, oldVal) {
                    filter(newVal);
                });

                function filter(filterKey) {
                    if (filterKey) {
                        $scope.$parent.$parent.filter(filterKey, $scope.memberList, ['id', 'lName', 'fName'])
                            .then(result => $scope.filteredList = result);
                    } else {
                        $scope.filteredList = $scope.memberList;
                    }
                }

                $scope.generate = function() {
                    $scope.$parent.isLoading = true;
                    $scope.$parent.trustedURL = null;
                    $localStorage.reports = $scope.reports;
                    $scope.reports.deadline = $scope.periodCutOff.toLocaleDateString();
                    $scope.reports.billingDate = $scope.constant.month[$scope.period.periodMonth] + " " + $scope.year;
                    $scope.reports.periodId = $scope.period.id;
                    if ($scope.isManual === "t") {
                        $scope.reports.list = $scope.memberList.filter(data => {
                            return data.selected;
                        }).map(data => {
                            return data.id;
                        });
                    } else {
                        $scope.reports.list = undefined;
                    }
                    ReportsService.generateBS($scope.reports).then($scope.showPdf).catch($scope.errorhandler)
                }



            }
        ])
}())