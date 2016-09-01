(function() {
    'use strict';

    angular
        .module('hmapFront')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider
            .state('error', {
                url: '/error',
                data: {
                    authorities: [],
                    pageTitle: 'error.title'
                },
               templateUrl: 'app/layouts/error/error.html'
                //views: {
                //    'content@': {
                //        templateUrl: 'app/layouts/error/error.html'
                //    }
                //}
            })
            .state('accessdenied', {
                //parent: 'app',
                url: '/accessdenied',
                data: {
                    authorities: []
                },
                templateUrl: 'app/layouts/error/accessdenied.html'
                //views: {
                //    'content@': {
                //
                //    }
                //}
            });
    }
})();
