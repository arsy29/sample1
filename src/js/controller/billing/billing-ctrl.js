(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ViewBillingCtrl', ['$scope', '$uibModal', function($scope, $uibModal) {
            console.log('ViewBillingCtrl');
            $scope.mode = "view";

            //to be removed

            var testinit = function(count) {
                $scope.members = [{
                    name: 'test1',
                    id: '1',
                    remaining: 2000,
                    member: {
                        lastName: 'test',
                        firstName: 'sample',
                        address: 'Laguna St.'
                    },
                    billing: {
                        assocDue: 500,
                        presentReading: 120,
                        previousReading: 100,
                        totalConsumed: 20,
                        waterAmount: 500,
                        otherDescription: 'Lights',
                        otherAmount: -200,
                        currentTotal: 1000,
                        previousTotal: 500,
                        previousPayment: 450,
                        grandTotal: 1050
                    },
                    payments: [{
                        receiptNo: '10001',
                        amount: 500,
                        date: 'Mon Sep 26 2016 00:00:00 GMT+0800 (Malay Peninsula Standard Time)'
                    }, {
                        receiptNo: '10002',
                        amount: 200,
                        date: new Date('Mon Sep 26 2016 00:00:00 GMT+0800 (Malay Peninsula Standard Time)')
                    }, {
                        receiptNo: '10003',
                        amount: 100,
                        date: 'Mon Sep 26 2016 00:00:00 GMT+0800 (Malay Peninsula Standard Time)'
                    }]
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }];
            };
            testinit();

            //end

            /* Select Member */
            $scope.loadMember = function(index) {
                $scope.selected = $scope.members[index];
                $scope.computed = {};
                setRemaining();
                computeSumOfCollections();
            }

            /* Billing */
            $scope.billing = {
                isDisabled: true
            }

            //computations
            var setRemaining = function() {
                if ($scope.selected.billing) {
                    $scope.computed.remaining = $scope.selected.billing.previousTotal - $scope.selected.billing.previousPayment;
                }
            }

            /* PAYMENT */
            //ADD/EDIT
            $scope.paymentModel = {
                payments: [],
                total: 0
            };
            $scope.openPaymentModal = function(mode) {
                    $uibModal.open({
                        templateUrl: "view/collection/payment-modal.html",
                        resolve: {
                            form: function() {
                                return mode ? $scope.selected.payments[$scope.paymentModel.selected] : null;
                            }
                        },
                        controller: ['$scope', 'form', function($scope, form) {
                            $scope.form = form || {};
                            $scope.proceed = form ? function() {
                                    this.$close();
                                } :
                                function() {
                                    this.$close($scope.form);
                                };
                            $scope.cancel = function() {
                                this.$dismiss();
                            }

                        }]
                    }).result.then(function(result) {
                        if (result) {
                            $scope.selected.payments.push(result);
                        }
                    }).finally(computeSumOfCollections);
                }
                //DELETE
            $scope.deletePayment = function() {
                $scope.selected.payments.splice($scope.paymentModel.selected, 1);
                $scope.paymentModel.selected = null;
                computeSumOfCollections();
            }

            var computeSumOfCollections = function() {
                if ($scope.selected.payments) {
                    $scope.computed.totalPayments = 0;
                    $scope.selected.payments.forEach(function(payment) {
                        $scope.computed.totalPayments += payment.amount;
                    });
                }
            }

        }])
}())