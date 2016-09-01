(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('SchedulerStandby', SchedulerStandby);

  SchedulerStandby.$inject = ['$resource'];

  function SchedulerStandby ($resource) {
    return $resource("/api/scheduler/standby", {}, {
      'standby': {method: 'POST'}
    });
  }
})();
