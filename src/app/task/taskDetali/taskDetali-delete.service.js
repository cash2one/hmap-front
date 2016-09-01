(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetaliDelete', TaskDetaliDelete);

  TaskDetaliDelete.$inject = ['$resource'];

  function TaskDetaliDelete ($resource) {
    return $resource("/api/deletejob", {}, {
      'update': {method: 'POST'}
    });
  }
})();
