(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('ExecutionLog', ExecutionLog);

  ExecutionLog.$inject = ['$resource'];

  function ExecutionLog ($resource) {
    var service = {
      loadAll: loadAll
    };
    return service;

    function loadAll(page, pageSize) {
      return $resource("/api/ExecutionLog?page=" + page + "&pageSize=" + pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
  }
})();
