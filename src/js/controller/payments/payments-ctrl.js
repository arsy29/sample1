(function() {
    'use strict';
    angular.module('bvha2')
        .controller('PaymentsCtrl', ['$scope', 'Constant', "BillingService", "PaymentService", "$uibModal", "MemberService", function($scope, constants, BillingService, PaymentService, $uibModal, MemberService) {
            var paymentList = [];

            $scope.filterKeys = constants.TransactionType;
            $scope.month = constants.month;
            $scope.filterKey = 0;
            $scope.pivot = [];
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
                    loadData();
                }
            })

            function loadData() {
                PaymentService.getPaymentsByPeriod($scope.period.id).then(response => {
                    if (response.data.responseStatus > 0) {
                        $scope.pivot = [];
                        $scope.totalAmount = 0;
                        paymentList = response.data.responseResult.map(item => {
                            let transaction = mapPaymentType(item.paymentType)
                            let group = $scope.pivot.find(_group => {
                                return _group.name === transaction;
                            })
                            if (group) {
                                group.amount += item.amount;
                            } else {
                                $scope.pivot.push({
                                    name: transaction,
                                    amount: item.amount
                                })
                            }
                            $scope.totalAmount += item.amount;
                            return {
                                id: item.id,
                                name: item.lname ? item.lname + ", " + item.fname : 'n/a',
                                transaction: transaction,
                                paymentType: item.paymentType,
                                receiptNo: item.receipt_no,
                                paymentDate: item.paymentDate,
                                amount: item.amount,
                                memberId: item.member
                            }
                        });
                        filter();
                    }
                })
            }

            $scope.openPaymentModal = function(payment) {
                var filterKeys = angular.copy($scope.filterKeys);
                MemberService.getMemberList().then(response => {
                    if (response.data.responseStatus > 0) {
                        let memberList = response.data.responseResult.map(item => {
                            return {
                                name: item.id + " - " + item.lname + ", " + item.fname,
                                id: item.id
                            }
                        });
                        $uibModal.open({
                            templateUrl: "view/collection/payment-modal.html",
                            resolve: {
                                form: function() {
                                    return payment;
                                }
                            },
                            controller: ['$scope', 'form', function($scope, form) {
                                $scope.memberList = memberList;
                                $scope.showTransaction = true;
                                $scope.form = form || {};
                                $scope.filterKeys = filterKeys;
                                $scope.filterKeys.splice(0, 2);
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
                                        $scope.form.paymentDate = new Date($scope.form.receiptDate + $scope.form.receiptDate.getTimezoneOffset()).toISOString().split("T")[0];

                                    }
                                });

                            }]
                        }).result.then(function(result) {
                            if (result) {
                                result.billingPeriod = $scope.period.id;
                                PaymentService.addOrEditPaymentsToId(result).then(function(response) {
                                    if (response.responseStatus) {
                                        console.log("SUCCESS");
                                    }
                                }).finally(loadData);
                            }
                        });
                    }
                })
            }

            $scope.deletePayment = function(item) {
                if (window.confirm("Are you sure you want to remove this payment?")) {
                    PaymentService.deletePaymentsById(item.id).then(function(response) {
                        if (response.responseStatus) {
                            console.log("SUCCESS");
                        }
                    }).finally(loadData);
                }
            }

            $scope.$watch('filterKey', (newValue, oldValue) => {
                filter();
            })

            function filter() {
                if ($scope.filterKey === 0) {
                    $scope.paymentsFiltered = paymentList;
                } else {
                    $scope.paymentsFiltered = paymentList.filter(item => {
                        return item.paymentType === $scope.filterKey;
                    })
                }
            }

            function mapPaymentType(value) {
                return $scope.filterKeys.find(item => {
                    return item.value === value;
                }).description;
            }




        }])
}())