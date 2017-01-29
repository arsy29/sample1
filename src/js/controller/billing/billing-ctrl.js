(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ViewBillingCtrl', ['$scope', '$uibModal', 'PaymentService', 'BillingService', 'Constant', function($scope, $uibModal, paymentService, billingService, constant) {
            console.log('ViewBillingCtrl');
            $scope.mode = "view";
            $scope.constant = constant;
            $scope.hasCollection = true;
            //end

            /* Select Member */
            $scope.loadMember = function(index) {
                //initialize
                $scope.selected = {
                        member: $scope.filteredList[index],
                        payments: [],
                        index: index
                    }
                    //billing
                billingService.getDetails($scope.selected.member.id, $scope.billing.period.id).then(function(response) {
                    console.log(response);
                    if (response.data.responseStatus > 0) {
                        $scope.selected.billing = response.data.responseResult;
                        $scope.selected.billing.totalConsumed = $scope.selected.billing.currReading - $scope.selected.billing.prevReading;
                        $scope.selected.breakdown = billingService.getBreakdown($scope.selected.billing.totalConsumed)
                        $scope.selected.billing.remaining = $scope.selected.billing.previousTotal - $scope.selected.billing.previousPaymentTotal;
                        $scope.computed = {};
                        reloadPayments();

                    }
                });

                //payment

            }



            /* Billing */
            $scope.billing = {
                isDisabled: true
            }

            billingService.getBillingYear().then(function(response) {
                if (response.data.responseStatus > 0) {
                    $scope.billing.yearList = response.data.responseResult;
                    if ($scope.billing.yearList.length > 0) {
                        $scope.billing.year = $scope.billing.yearList[0];
                        $scope.billing.getPeriodByYear($scope.billing.year)
                    }
                }
            })

            $scope.billing.getPeriodByYear = function(year) {
                billingService.getPeriodByYear(year).then(function(response) {
                    if (response.data.responseStatus > 0) {
                        $scope.billing.periodList = response.data.responseResult;
                        if ($scope.billing.periodList.length > 0) {
                            $scope.billing.period = $scope.billing.periodList[0];
                            $scope.billing.getMemberBillList($scope.billing.period)
                        }
                    }
                })
            }

            $scope.billing.getMemberBillList = function(period) {
                billingService.getMemberBillList(period.id).then(function(response) {
                    if (response.data.responseStatus > 0) {
                        $scope.billing.billList = response.data.responseResult;
                        $scope.billing.cutOff = new Date(period.periodCutOff);
                        $scope.selected = null;
                        filter();
                    }
                })
            }

            $scope.$watch("filterKey", function() {
                filter();
            });

            function filter() {
                $scope.$parent.filter($scope.filterKey, $scope.billing.billList, ['id', 'lName', 'fName']).then(function(result) {
                    $scope.filteredList = result;
                    console.log("filtered");
                }).finally(function() {
                    updateIdx();
                })
            }





            /* PAYMENT */
            //ADD/EDIT
            $scope.paymentModel = {
                payments: [],
                total: 0
            };
            $scope.openPaymentModal = function(index) {
                $uibModal.open({
                    templateUrl: "view/collection/payment-modal.html",
                    resolve: {
                        form: function() {
                            return index != null && index != undefined ? $scope.selected.payments[index] : null;

                        }
                    },
                    controller: ['$scope', 'form', function($scope, form) {
                        $scope.form = form || {};
                        if (form) {
                            form.receiptDate = new Date(form.paymentDate);
                        }
                        $scope.proceed =
                            function() {
                                this.$close($scope.form);
                            };
                        $scope.cancel = function() {
                            this.$dismiss();
                        }
                        $scope.$watch("form.receiptDate", function() {
                            if ($scope.form.receiptDate) {
                                $scope.form.paymentDate = $scope.form.receiptDate.toISOString().split("T")[0];

                            }
                        });

                    }]
                }).result.then(function(result) {
                    if (result) {
                        result.memberId = $scope.selected.member.id;
                        result.billingId = $scope.selected.billing.id;
                        result.billingPeriod = $scope.selected.billing.period;
                        paymentService.addOrEditPaymentsToId(result).then(function(response) {
                            if (response.responseStatus) {
                                console.log("SUCCESS");
                            }
                        }).finally(reloadPayments);
                    }
                }).finally(computeSumOfCollections);
            }



            //DELETE
            $scope.deletePayment = function(index) {
                paymentService.deletePaymentsById($scope.selected.payments[index].id).then(function(response) {
                    if (response.responseStatus) {
                        console.log("SUCCESS");
                    }
                }).finally(reloadPayments);
                $scope.selected.payments.splice($scope.paymentModel.selected, 1);
                $scope.paymentModel.selected = null;
                computeSumOfCollections();
            }

            function reloadPayments() {
                paymentService.getPaymentsById($scope.selected.billing.id).then(function(response) {
                    if (response.data.responseStatus > 0) {
                        $scope.selected.payments = response.data.responseResult;
                        computeSumOfCollections();

                    }
                });
            }

            var computeSumOfCollections = function() {
                if ($scope.selected.payments) {
                    $scope.computed.totalPayments = 0;
                    $scope.selected.payments.forEach(function(payment) {
                        $scope.computed.totalPayments += payment.amount;
                    });
                }
                computeGrandTotal();
            }

            function computeGrandTotal() {
                if ($scope.selected) {
                    $scope.computed.grandTotal = $scope.selected.billing.grandTotal - $scope.computed.totalPayments;
                    $scope.selected.member.remaining = $scope.computed.grandTotal;
                }
            }
            $scope.$watch('computed.totalPayments', function() {
                computeGrandTotal();
            })

            var updateIdx = function() {
                if ($scope.selected) {
                    $scope.selected.index = $scope.filteredList.findIndex(function(data) {
                        return data.id == $scope.selected.member.id;
                    });
                }
            }



        }])
}())