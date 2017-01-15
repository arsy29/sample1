(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsCoreCtrl', ['$scope', 'Constant', 'BillingService', '$sce', function($scope, constant, BillingService, $sce) {
            console.log('ReportsCoreCtrl');
            $scope.constant = constant;

            BillingService.getBillingYear()
                .then(response => {
                    if (response.data.responseStatus) {
                        $scope.yearList = response.data.responseResult;
                        $scope.year = $scope.yearList[0];
                    }
                })
                .catch(error => console.log(error));

            $scope.$watch('year', (newVal, oldVal) => {
                if (!newVal) {
                    return;
                }
                BillingService.getPeriodByYear($scope.year)
                    .then(response => {
                        if (response.data.responseStatus) {
                            $scope.periodList = response.data.responseResult;
                            $scope.period = $scope.periodList[0];
                            $scope.periodCutOff = new Date($scope.period.periodCutOff);
                        }
                    })
                    .catch(error => console.log(error));
            })

            $scope.showPdf = function(response) {
                var file = new Blob([response.data], {
                    type: 'application/pdf'
                });
                var fileURL = URL.createObjectURL(file);
                $scope.pdf = $sce.trustAsResourceUrl(fileURL);
            }

            $scope.$watch('mode', () => {
                $scope.pdf = null;
            })

        }])
}())