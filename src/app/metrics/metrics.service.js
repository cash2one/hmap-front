(function() {
    'use strict';

    angular
        .module('hmapFront')
        .factory('MetricsService', MetricsService);

  MetricsService.$inject = ['$rootScope', '$http','BaseConfig'];

    function MetricsService ($rootScope, $http,BaseConfig) {
        var service = {
            getMetrics: getMetrics,
            threadDump: threadDump
        };

        return service;

        function getMetrics () {
            return $http.get('/metrics/metrics').then(function (response) {
                //console.log(response);
                return response.data;
            });
        }

        function threadDump () {
            return $http.get('/metrics/threads').then(function (response) {
                return response.data;
            });
        }
    }
})();
