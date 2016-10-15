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
                    remaining: 2000
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }, {
                    name: 'test2',
                    id: '2',
                    remaining: 2000
                }, {
                    name: 'test3',
                    id: '3',
                    remaining: 0
                }, {
                    name: 'test4',
                    id: '4',
                    remaining: 1500
                }, {
                    name: 'test5',
                    id: '5',
                    remaining: 200
                }];
            };
            testinit();

            //end
            /* Billing */
            $scope.billing = {
                isDisabled: true
            }

            /* PAYMENT */
            //ADD/EDIT
            $scope.paymentModel = {
                payments: [],
                total: 0
            };
            var isSelected = function() {

            }
            $scope.openPaymentModal = function(mode) {
                    $uibModal.open({
                        templateUrl: "view/collection/payment-modal.html",
                        resolve: {
                            form: function() {
                                if (mode) {
                                    return $scope.paymentModel.payments[$scope.paymentModel.selected];
                                } else {
                                    return null;
                                }
                            }
                        },
                        controller: ['$scope', 'form', function($scope, form) {
                            $scope.form = form || {};
                            $scope.addPayment = function() {
                                // $scope.paymentModel.push(obj);
                                console.log(this);
                                this.$close($scope.form);
                            }

                            $scope.cancel = function() {
                                this.$dismiss();
                            }

                        }]
                    }).result.then(function(result) {
                        $scope.paymentModel.payments.push(result);
                    }).finally(successPayment);
                }
                //DELETE
            $scope.deletePayment = function() {
                $scope.paymentModel.payments.splice($scope.paymentModel.selected, 1);
                $scope.paymentModel.selected = null;
                successPayment();
            }

            var successPayment = function() {
                $scope.paymentModel.total = 0;
                $scope.paymentModel.payments.forEach(function(payment) {
                    $scope.paymentModel.total += payment.amount;
                });
            }

        }])
}())