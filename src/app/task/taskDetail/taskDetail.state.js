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
      .state('taskDetail', {
        parent: 'app',
        url: "/taskDetail",
        views: {
          'body': {
            templateUrl: "app/task/taskDetail/taskDetail.html",
            controller: 'TaskDetailController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  jobName: null,
                  jobStatus:null,
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
      .state('taskDetail.scheduler', {
        parent: 'app',
        url: "/scheduler",
        views: {
          'body': {
            templateUrl: "app/task/taskDetail/scheduler.html",
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
      .state('taskDetail.new', {
        parent: 'taskDetail',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetail/taskDetail-new.html",
            controller: 'TaskDetailNewController',
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
              //console.log("taskDetail go1");
              $state.go('taskDetail', null, { reload: true });
            }, function() {
              //console.log("taskDetail go2");
              $state.go('taskDetail');
            });
        }]
      })
      .state('taskDetail.newCrom', {
        parent: 'taskDetail',
        url: "/newCrom",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetail/taskDetail-new-crom.html",
            controller: 'TaskDetailNewCromController',
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
              //console.log("taskDetail go1");
              $state.go('taskDetail', null, { reload: true });
            }, function() {
              //console.log("taskDetail go2");
              $state.go('taskDetail');
            });
        }]
      })
      .state('taskDetail.newRest', {
        parent: 'taskDetail',
        url: "/newRest",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetail/taskDetail-new-rest.html",
            controller: 'TaskDetailNewRestController',
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
              //console.log("taskDetail go1");
              $state.go('taskDetail', null, { reload: true });
            }, function() {
              //console.log("taskDetail go2");
              $state.go('taskDetail');
            });
        }]
      })
      .state('taskDetail.show', {
        parent: 'taskDetail',
        url: "/:jobName/show",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: "app/task/taskDetail/taskDetail-show.html",
            controller: 'TaskDetailShowController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  jobName: $stateParams.jobName
                };
                //return {
                //  jobName: null,
                //  jobGroup: null,
                //  description: null,
                //  jobClassName: null,
                //  start: null,
                //  end: null,
                //  previousFireTime: null,
                //  fireTime: null,
                //  scheduledFireTime: null,
                //  nextFireTime: null,
                //  cronExpression: null
                //};
              }
            }
          }).result.then(function() {
              //console.log("taskDetail go1");
              $state.go('taskDetail', null, { reload: true });
            }, function() {
              //console.log("taskDetail go2");
              $state.go('taskDetail');
            });
        }]
      })
  }

})();
