            (function() {
                'use strict';
                angular.module('bvha2')
                    .controller('ReportsCoreCtrl', ['$scope', 'Constant', 'BillingService', '$sce', 'pdfDelegate', function($scope, constant, BillingService, $sce, pdfDelegate) {
                        console.log('ReportsCoreCtrl');
                        $scope.constant = constant;
                        $scope.period = null;
                        $scope.year = null;
                        $scope.fileURL = null;
                        $scope.trustedURL = null;
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
                            $scope.fileURL = URL.createObjectURL(file);
                            $scope.trustedURL = $sce.trustAsResourceUrl($scope.fileURL);
                            $scope.pdfViewer = pdfDelegate.$getByHandle('my-pdf-container');
                            $scope.pdfViewer.load($scope.fileURL);
                        }

                        $scope.$watch('mode', () => {
                            $scope.pdf = null;
                        })

                        $scope.download = function() {
                            return $scope.trustedURL;
                        }

                        $scope.print = function() {
                            window.printJS($scope.trustedURL);
                        }

                        // var fs = window.require('fs')
                        // console.log(printer.getPrinters());
                    }])
            }())