/**
 * Created by user on 2016/8/8.
 */

(function () {
    'use strict';
    angular.module('hmapFront')
        .factory('EditLineService', EditLineService);

    EditLineService.$inject = ['$resource'];

    function EditLineService($resource) {

        var service = {
            updateLine: updateLine,
            getLine: getLine
        };
        return service;

        function getLine() {
            var resourceUrl = '/api/queryLine';
          return $resource(resourceUrl, {}, {
            'get': {method: 'POST'}
          });

        }

        function updateLine() {
            var resourceUrl = '/api/updateLine';
          return $resource(resourceUrl, {}, {
            'update': {method: 'POST'}
          });

        }


    }


})();
