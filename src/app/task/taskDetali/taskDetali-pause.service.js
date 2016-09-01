(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetaliPause', TaskDetaliPause);

  TaskDetaliPause.$inject = ['$resource'];

  function TaskDetaliPause ($resource) {
    return $resource("/api/pausejob", {}, {
      'update': {method: 'POST'}
    });
  }
})();
