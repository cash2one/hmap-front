(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetaliResume', TaskDetaliResume);

  TaskDetaliResume.$inject = ['$resource'];

  function TaskDetaliResume ($resource) {
    return $resource("/api/resumejob", {}, {
      'update': {method: 'POST'}
    });
  }
})();
