(function(){
	'use strict',
	angular.module('bvha2')
		.config(['$stateProvider', function($stateProvider){
			$stateProvider
				.state('main.dashboard', {
					url: '/dashboard',
					templateUrl : 'view/dashboard/dashboard.html',
					controller : 'DashboardCtrl'
				})
		}])
}())