(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetali', TaskDetali);

  TaskDetali.$inject = ['$resource'];

  function TaskDetali ($resource) {
    var service = {
      TaskDetaliCreate: TaskDetaliCreate,
      TaskDetaliDelete: TaskDetaliDelete,
      TaskDetaliPause: TaskDetaliPause,
      TaskDetaliFound: TaskDetaliFound,
      TaskDetaliResume: TaskDetaliResume,
      SchedulerPauseall: SchedulerPauseall,
      SchedulerQuery: SchedulerQuery,
      SchedulerResumeall: SchedulerResumeall,
      SchedulerStandby: SchedulerStandby,
      SchedulerStart: SchedulerStart,
      SchedulerInfo: SchedulerInfo
    };
    return service;

    function TaskDetaliCreate () {
      return $resource("/api/createJob", {}, {
        'save': {method: 'POST'}
      });
    }
    function TaskDetaliDelete () {
      return $resource("/api/deletejob", {}, {
        'update': {method: 'POST'}
      });
    }
    function TaskDetaliPause () {
      return $resource("/api/pausejob", {}, {
        'update': {method: 'POST'}
      });
    }
    function TaskDetaliFound () {
      return $resource("/api/foundJob", {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function TaskDetaliResume () {
      return $resource("/api/resumejob", {}, {
        'update': {method: 'POST'}
      });
    }
    function SchedulerPauseall () {
      return $resource("/api/scheduler/pauseall", {}, {
        'pauseall': {method: 'POST'}
      });
    }
    function SchedulerQuery () {
      return $resource("/api/scheduler/query", {}, {
        'query': {method: 'POST'}
      });
    }
    function SchedulerResumeall () {
      return $resource("/api/scheduler/pauseall", {}, {
        'resumeall': {method: 'POST'}
      });
    }
    function SchedulerStandby () {
      return $resource("/api/scheduler/standby", {}, {
        'standby': {method: 'POST'}
      });
    }
    function SchedulerStart () {
      return $resource("/api/scheduler/start", {}, {
        'start': {method: 'POST'}
      });
    }
    function SchedulerInfo () {
      return $resource("/api/scheduler/info", {}, {
        'info': {method: 'POST'}
      });
    }
  }
})();
