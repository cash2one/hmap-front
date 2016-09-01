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
      .state('taskDetali', {
        parent: 'app',
        url: "/taskDetali",
        views: {
          'body': {
            templateUrl: "app/task/taskDetali/taskDetali.html",
            controller: 'TaskDetaliController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  jobName: null,
                  jobGroup: null,
                  jobClassName: null,
                  description: null,
                  previousFireTime: null,
                  scheduledFireTime: null,
                  nextFireTime: null,
                  fireTime: null
                };
              }
            }
          }
        }
      })
      .state('taskDetali.scheduler', {
        parent: 'app',
        url: "/scheduler",
        views: {
          'body': {
            templateUrl: "app/task/taskDetali/scheduler.html",
            controller: 'SchedulerController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  runningSince:null,
                  numberOfJobsExecuted: null,
                  schedulerName: null,
                  schedulerInstanceId: null,
                  threadPoolSize: null,
                  version: null,
                  inStandbyMode: null,
                  jobStoreClustered: null,
                  jobStoreClass: null,
                  jobStoreSupportsPersistence: null,
                  started: null,
                  shutdown: null,
                  schedulerRemote: null
                };
              }
            }
          }
        }
      })
      .state('taskDetali.new', {
        parent: 'taskDetali',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetali/taskDetali-new.html",
            controller: 'TaskDetaliNewController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  jobName: null,
                  jobGroup: null,
                  jobClassName: null,
                  description: null,
                  previousFireTime: null,
                  scheduledFireTime: null,
                  nextFireTime: null,
                  fireTime: null
                };
              }
            }
          }).result.then(function() {
              console.log("taskDetali go1");
              $state.go('taskDetali', null, { reload: true });
            }, function() {
              console.log("taskDetali go2");
              $state.go('taskDetali');
            });
        }]
      })
      .state('taskDetali.newCrom', {
        parent: 'taskDetali',
        url: "/newCrom",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetali/taskDetali-new-crom.html",
            controller: 'TaskDetaliNewCromController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  jobName: null,
                  jobGroup: null,
                  jobClassName: null,
                  description: null,
                  previousFireTime: null,
                  scheduledFireTime: null,
                  nextFireTime: null,
                  fireTime: null
                };
              }
            }
          }).result.then(function() {
              console.log("taskDetali go1");
              $state.go('taskDetali', null, { reload: true });
            }, function() {
              console.log("taskDetali go2");
              $state.go('taskDetali');
            });
        }]
      })
  }

})();
