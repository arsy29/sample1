(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsBRCtrl', ['$scope', '$state', 'ReportsService', function($scope, $state, ReportsService) {
            console.log('ReportsBRCtrl');
            console.log($state);
            $scope.$parent.mode = 'br';
            $scope.filename = "Billing Report.pdf"



            $scope.generate = function() {
                let reports = {
                    month: $scope.constant.month[$scope.period.periodMonth] + " " + $scope.year,
                    periodId: $scope.period.id
                }
                ReportsService.generateBR(reports).then($scope.showPdf);

            }


            $scope.$watch('period', (newVal, oldVal) => {
                if (newVal) {
                    $scope.periodCutOff = new Date($scope.period.periodCutOff);
                }
            });

        }])
}())