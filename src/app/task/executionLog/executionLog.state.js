/**
 * Created by zhouzy on 2016/7/23 0023.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
     .state('executionLog', {
        parent: 'app',
        url: "/executionLog",
        views: {
          'body': {
            templateUrl: "app/task/executionLog/executionLog.html",
            controller: 'ExecutionLogController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  jobRunningInfoId: null,
                  jobName: null,
                  jobGroup: null,
                  jobStatus: null,
                  executionSummary: null,
                  previousFireTime: null,
                  scheduledFireTime: null,
                  nextFireTime: null,
                  fireTime: null,
                };
              }
            }
          }
        }
      })
  }

})();
