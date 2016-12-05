(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsBSCtrl', ['$scope', '$state', function($scope, $state) {
            console.log('ReportsBSCtrl');
            console.log($state);
            $scope.$parent.mode = 'bs';
        }])
}())