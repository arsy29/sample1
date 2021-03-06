(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsPRCtrl', ['$scope', '$state', 'ReportsService', function($scope, $state, ReportsService) {
            console.log('ReportsPRCtrl');
            console.log($state);
            $scope.$parent.mode = 'pr';
            $scope.filename = "Payment Report.pdf"
            $scope.$parent.trustedURL = null;

            $scope.generate = function() {
                $scope.$parent.isLoading = true;
                $scope.$parent.trustedURL = null;
                let reports = {
                    month: $scope.constant.month[$scope.period.periodMonth] + " " + $scope.year,
                    periodId: $scope.period.id
                }
                ReportsService.generatePR(reports).then($scope.showPdf).catch($scope.errorhandler);

            }


            $scope.$watch('period', (newVal, oldVal) => {
                if (newVal) {
                    $scope.periodCutOff = new Date($scope.period.periodCutOff);
                }
            });
        }])
}())