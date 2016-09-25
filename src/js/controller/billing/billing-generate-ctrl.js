(function() {
    'use strict';
    angular.module('bvha2')
        .controller('GenerateBillingCtrl', ['$scope', function($scope) {
        	console.log('GenerateBillingCtrl');
        	$scope.mode = 'generate';
        }])
}())