            (function() {
                'use strict';
                angular.module('bvha2')
                    .controller('ReportsCoreCtrl', ['$scope', 'Constant', 'BillingService', '$sce', 'pdfDelegate', 'ReportsService', function($scope, constant, BillingService, $sce, pdfDelegate, ReportsService) {
                        console.log('ReportsCoreCtrl');
                        $scope.constant = constant;
                        $scope.period = null;
                        $scope.year = null;
                        $scope.fileURL = null;
                        $scope.trustedURL = null;
                        $scope.pdf = {
                            pageNum: 0
                        };
                        $scope.isLoading;
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
                            if (response) {
                                var file = new Blob([response.data], {
                                    type: 'application/pdf'
                                });
                                $scope.fileURL = URL.createObjectURL(file);
                                $scope.trustedURL = $sce.trustAsResourceUrl($scope.fileURL);
                                //$scope.trustedURL = $scope.fileURL; //$sce.trustAsResourceUrl($scope.fileURL);
                                //$scope.pdfViewer = pdfDelegate.$getByHandle('my-pdf-container');
                                //$scope.pdfViewer.load($scope.fileURL);
                            }
                            $scope.isLoading = false;
                            $scope.$apply();
                        }


                        $scope.errorhandler = function(err) {
                            if (err) {
                                alert("Error Occured Please Contant System Admin");
                            }
                            $scope.isLoading = false;
                        }


                        $scope.download = function() {
                            return $scope.trustedURL;
                        }

                        $scope.print = function() {
                            window.printJS($scope.trustedURL);
                        }

                        $scope.$watch(function() {
                            if ($scope.pdfViewer) return $scope.pdfViewer.getCurrentPage()
                        }, newVal => {
                            if (newVal)
                                $scope.pdf.pageNum = newVal;
                        });


                        $scope.$watch('pdf.pageNum', (newValue, oldValue) => {
                            if (newValue && newValue != $scope.pdfViewer.getCurrentPage()) {
                                if (newValue <= $scope.pdfViewer.getPageCount() && newValue > 0) {
                                    $scope.pdfViewer.goToPage(newValue);
                                    //todo:
                                } else {
                                    window.alert("Please input a valid Page Number.");
                                    $scope.pdf.pageNum = oldValue;
                                }
                            }
                        });

                        $scope.$watch('mode', (newValue, oldValue) => {
                            if (oldValue === newValue) {
                                return;
                            } else {
                                let currentXHR = ReportsService.getCurrentXHR()
                                if (currentXHR) {
                                    currentXHR();
                                }
                            }
                        })

                    }])
            }())