(function() {
    'use strict';

    angular
        .module('hmapFront')
        .config(stateConfig);

    stateConfig.$inject = ['$stateProvider'];

    function stateConfig($stateProvider) {
        $stateProvider.state('metrics', {
            parent: 'app',
            url: '/metrics',
            data: {
                authorities: ['ROLE_ADMIN'],
                pageTitle: 'Application Metrics'
            },
            views: {
                'body': {
                    templateUrl: 'app/metrics/metrics.html',
                    controller: 'MetricsMonitoringModalController',
                    controllerAs: 'vm'
                }
            }
        });
    }
})();
