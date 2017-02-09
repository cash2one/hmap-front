/**
 * Created by zhouzy on 2016/8/18 0018.
 */
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
      .state('sysConfig', {
        parent: 'app',
        url: "/sysConfig",
        views: {
          'body': {
            templateUrl: "app/sysConfig/sysConfig.html",
            controller: 'SysConfigController',
            controllerAs: 'vm'
          }
        }
      })
      .state('sysConfig.new', {
        parent: 'sysConfig',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/sysConfig/sysConfig-dialog.html',
            controller: 'SysConfigDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  configKey: null,
                  configValue: null,
                  configLevel: null,
                  enable: 'Y',
                  configDesc: null
                };
              }
            }
          }).result.then(function () {
              $state.go('sysConfig', null, {reload: true});
            }, function () {
              $state.go('sysConfig');
            });
        }]
      }).state('sysConfig.edit', {
        parent: 'sysConfig',
        url: "/edit/:id",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/sysConfig/sysConfig-dialog.html',
            controller: 'SysConfigDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: $stateParams.id
                };
              }
            }
          }).result.then(function () {
              $state.go('sysConfig', null, {reload: true});
            }, function () {
              $state.go('sysConfig');
            });
        }]
      });
  }
})();
