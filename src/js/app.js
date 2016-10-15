(function() {
    'use strict';
    angular
        .module('bvha2', ['ngAnimate', 'ngSanitize', 'ngMessages', 'ngRoute', 'ui.bootstrap', 'ui.router', 'ui.scroll'])
        .run(function() {
            console.log("Welcome to Bvha Water billing system 2.0");
        })
})();