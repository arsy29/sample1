(function() {
    'use strict';
    angular.module("bvha2")
        .service('MemberService', ["$http", "api", function($http, api) {
            this.getMemberList = function() {
                return $http.get(api.endpoint + "/member/list");
            }

            this.addOrEditMember = function(member) {
                return $http.post(api.endpoint + "/member/persist", member);
            }

            this.getContactList = function(id) {
                return $http.get(api.endpoint + "/member/contact/list/" + id);
            }

            this.addOrEditContacts = function(contact) {
                return $http.post(api.endpoint + "/member/contact/persist", contact);
            }

            this.deleteContact = function(id) {
                return $http.get(api.endpoint + "/member/contact/delete/" + id);
            }
        }])
}())