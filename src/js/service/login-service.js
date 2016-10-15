(function() {
    'use strict';
    angular.module('bvha2')
        .service('LoginService', ['$state', function($state) {
            return {
                signin: function(username, password) {
                    return true;
                }
            };
        }]);
}());