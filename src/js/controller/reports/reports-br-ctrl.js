(function() {
    'use strict';
    angular.module('bvha2')
        .controller('ReportsBRCtrl', ['$scope', '$state', function($scope, $state) {
            console.log('ReportsBRCtrl');
            console.log($state);
            $scope.$parent.mode = 'br';
        }])
}())