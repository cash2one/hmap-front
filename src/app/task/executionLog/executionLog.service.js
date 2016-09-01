(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('ExecutionLog', ExecutionLog);

  ExecutionLog.$inject = ['$resource'];

  function ExecutionLog ($resource) {
    var resourceUrl = '/api/ExecutionLog/:id';

    return $resource(resourceUrl, {}, {
      'query': { method: 'POST',isArray: false},
      'get': {
        method: 'GET',
        transformResponse: function (data) {
          if (data) {
            data = angular.fromJson(data);
          }
          return data;
        }
      },
      'update': { method:'PUT' }
    });
  }
})();
