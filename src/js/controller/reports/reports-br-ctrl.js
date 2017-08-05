(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsBRCtrl', ['$scope', '$state', 'ReportsService', function($scope, $state, ReportsService) {
            console.log('ReportsBRCtrl');
            console.log($state);
            $scope.$parent.mode = 'br';
            $scope.filename = "Billing Report.pdf"
            $scope.$parent.trustedURL = null;



            $scope.generate = function() {
                $scope.$parent.isLoading = true;
                $scope.$parent.trustedURL = null;
                let reports = {
                    month: $scope.constant.month[$scope.period.periodMonth] + " " + $scope.year,
                    periodId: $scope.period.id
                }
                ReportsService.generateBR(reports).then($scope.showPdf).catch($scope.errorhandler);

            }


            $scope.$watch('period', (newVal, oldVal) => {
                if (newVal) {
                    $scope.periodCutOff = new Date($scope.period.periodCutOff);
                }
            });

        }])
}())