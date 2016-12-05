(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsPRCtrl', ['$scope', '$state', function($scope, $state) {
            console.log('ReportsPRCtrl');
            console.log($state);
            $scope.$parent.mode = 'pr';
        }])
}())