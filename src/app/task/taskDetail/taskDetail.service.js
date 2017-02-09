(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetail', TaskDetail);

  TaskDetail.$inject = ['$resource'];

  function TaskDetail ($resource) {
    var service = {
      TaskDetailCreate: TaskDetailCreate,
      TaskDetailDelete: TaskDetailDelete,
      TaskDetailPause: TaskDetailPause,
      TaskDetailFound: TaskDetailFound,
      TaskDetailResume: TaskDetailResume,
      SchedulerPauseall: SchedulerPauseall,
      SchedulerQuery: SchedulerQuery,
      SchedulerResumeall: SchedulerResumeall,
      SchedulerStandby: SchedulerStandby,
      SchedulerStart: SchedulerStart,
      SchedulerInfo: SchedulerInfo,
      AccessTokenGet:AccessTokenGet
    };
    return service;

    function AccessTokenGet(){
      return $resource("/api/job/getAccessToken", {}, {
        'get': {method: 'POST'}
      });
    }
    function TaskDetailCreate () {
      return $resource("/api/createJob", {}, {
        'save': {method: 'POST'}
      });
    }
    function TaskDetailDelete () {
      return $resource("/api/deletejob", {}, {
        'update': {method: 'POST'}
      });
    }
    function TaskDetailPause () {
      return $resource("/api/pausejob", {}, {
        'update': {method: 'POST'}
      });
    }
    function TaskDetailFound () {
      return $resource("/api/foundJob", {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function TaskDetailResume () {
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
