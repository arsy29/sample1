(function() {
    'use strict';
    angular.module("bvha2")
        .controller('MemberController', ['$scope',
            '$state', 'MemberService', 'Constant', '$uibModal',
            function($scope, $state, memberService, Constant, $uibModal) {
                $scope.isEditable = false;

                var memberList;


                function loadMember() {
                    memberService.getMemberList().then(function(response) {
                        if (response.data.responseMessage === "SUCCESS") {
                            memberList = response.data.responseResult;
                            filterMember();
                        }
                    })
                };
                loadMember();

                $scope.selectMember = function(idx) {
                    $scope.selectedIdx = idx;
                    $scope.selected = $scope.membersFiltered[idx];
                    // $scope.selected.contactList = [{}, {}, {}, {}];
                    updateContact();
                }


                $scope.$watch("keyword", function() {
                    filterMember();
                });

                var filterMember = function() {
                    $scope.$parent.filter($scope.keyword, memberList, ["id", "fname", "lname"]).then(function(result) {
                        // console.log(result);
                        $scope.membersFiltered = result;
                        updateIdx();
                    })
                }

                function updateContact() {
                    if ($scope.selected.id) {
                        var contactList = [];
                        memberService.getContactList($scope.selected.id).then(function(response) {
                            if (response.data.responseMessage == "SUCCESS") {
                                contactList = response.data.responseResult;
                            } else {
                                contactList = [];
                            }
                        }, function(result) {
                            contactList = [];
                        }).finally(function() {
                            $scope.contactList = contactList;
                        });
                    }
                }

                $scope.openContactModal = function(index) {
                    $uibModal.open({
                        templateUrl: "view/member/contact-modal.html",
                        resolve: {
                            contactType: function() {
                                return Constant.ContactType;
                            },
                            form: function() {
                                return index != null && index != undefined ? $scope.contactList[index] : null;
                            }
                        },
                        controller: ['$scope', 'contactType', 'form', function($scope, contactType, form) {
                            $scope.form = form || {};
                            $scope.contactTypeList = contactType;
                            $scope.proceed = function() {
                                this.$close($scope.form);
                            };
                            $scope.cancel = function() {
                                this.$dismiss();
                            }
                        }]
                    }).result.then(function(result) {
                        if (result) {
                            if ($scope.selected.id) {
                                result.member = $scope.selected.id;
                                memberService.addOrEditContacts(result);
                            } else {
                                if (!$scope.contactList) {
                                    $scope.contactList = [];
                                }
                                $scope.contactList.push(result)
                            }
                        }
                    }).finally(updateContact);
                };


                $scope.deleteContact = function(index) {
                    memberService.deleteContact($scope.contactList[index].id).then().finally(updateContact)
                }

                $scope.newMember = function() {
                    $scope.isEditable = true;
                    $scope.contactList = [];
                    $scope.selected = {};
                }

                $scope.edit = function() {
                    $scope.isEditable = true;
                }

                $scope.clear = function() {
                    $scope.isEditable = false;
                    $scope.selected = null;
                }

                $scope.save = function() {
                    if (window.confirm("Are you want to save changes/new member?")) {
                        $scope.isEditable = false;
                        memberService.addOrEditMember($scope.selected).then(function(response) {
                            console.log('member', response);
                            if (!$scope.selected.id) {
                                $scope.selected = response.data.responseResult;
                                updateIdx()
                                $scope.contactList.forEach(function(contact) {
                                    contact.member = $scope.selected.id
                                    memberService.addOrEditContacts(contact).then(function(response) {
                                        console.log('contact', response);
                                    })
                                })
                            }
                        }).finally(loadMember);
                    }
                }

                var updateIdx = function() {
                    if ($scope.selected) {
                        $scope.selectedIdx = $scope.membersFiltered.findIndex(function(data) {
                            return data.id == $scope.selected.id;
                        });
                    }
                }



            }
        ]);
}())