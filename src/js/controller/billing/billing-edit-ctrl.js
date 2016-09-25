(function() {
    'use strict';
    angular.module('bvha2')
        .controller('EditBillingCtrl', ['$scope', function($scope) {
        	console.log('EditBillingCtrl');
        	$scope.mode = 'edit';
        }])
}())