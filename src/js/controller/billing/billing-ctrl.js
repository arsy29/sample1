(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ViewBillingCtrl', ['$scope', function($scope) {
        	console.log('ViewBillingCtrl');
        	$scope.mode = "view";

        	var testinit = function(){
        		$scope.members = [
        			{name : 'test1', id : '1'},
        			{name : 'test2', id : '2'},
        			{name : 'test3', id : '3'},
        			{name : 'test4', id : '4'},
        			{name : 'test5', id : '5'}
        		];
        	};

        	testinit();


        	



        }])
}())