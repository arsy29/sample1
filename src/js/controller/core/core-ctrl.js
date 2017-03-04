(function() {
    'use strict';
    angular.module('bvha2')
        .controller('CoreController', ['$scope', '$timeout', '$q',
            function($scope, $timeout, $q) {
                console.log('CoreController');
                $scope.sideMenu;
                var filterDeffered;
                var filterTimeout;

                $scope.filter = function(keyword, list, filters, timeout) {
                    if (filterDeffered) {
                        $timeout.cancel(filterTimeout);
                        filterDeffered.reject();
                    }
                    filterDeffered = $q.defer();
                    filterTimeout = $timeout(function() {

                        if (keyword) {
                            var filteredList = [];
                            list.forEach(function(data) {
                                var key = "";
                                filters.forEach(function(filter) {
                                    if (key) {
                                        key += " ";
                                    }

                                    key += data[filter];
                                });

                                if (key.toUpperCase().includes(keyword.toUpperCase())) {
                                    filteredList.push(data);
                                }
                            })
                            filterDeffered.resolve(filteredList);
                        }
                        filterDeffered.resolve(list);
                        filterDeffered = null;
                    }, timeout || 800);
                    return filterDeffered.promise;
                }



            }
        ]);
}());