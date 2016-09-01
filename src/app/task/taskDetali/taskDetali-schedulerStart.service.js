(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('SchedulerStart', SchedulerStart);

  SchedulerStart.$inject = ['$resource'];

  function SchedulerStart ($resource) {
    return $resource("/api/scheduler/start", {}, {
      'start': {method: 'POST'}
    });
  }
})();
