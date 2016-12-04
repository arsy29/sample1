(function() {
    'use strict';
    angular.module("bvha2")
        .directive("toggle", function() {
            return {
                template: '<label class="switch"><input type="checkbox" ng-model="ngModel" ng-disabled="ngDisabled"><div class="slider round"></div></label>',
                scope: {
                    ngModel: "=",
                    ngDisabled: "="
                },
                required: ['ngModel'],
                restrict: "E"
            }
        })
}())