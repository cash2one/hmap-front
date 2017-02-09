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
      .state('thirdparty', {
        parent: 'app',
        url: "/thirdparty",
        views: {
          'body': {
            templateUrl: "app/thirdparty/thirdparty.html",
            controller: 'ThirdpartyController',
            controllerAs: 'vm'
          }
        }
      })
      .state('thirdparty-detail', {
        parent: 'app',
        url: "/thirdparty/:id",
        views: {
          'body': {
            templateUrl: "app/thirdparty/thirdparty-detail.html",
            controller: 'ThirdpartyDetailController',
            controllerAs: 'vm'
          }
        }
      })
      .state('thirdparty.new', {
        parent: 'thirdparty',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/thirdparty/thirdparty-dialog.html',
            controller: 'ThirdpartyDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  appName: null,
                  appDesc: null,
                  appCode: null,
                  appIcon: null,
                  appKey: null,
                  appSecret: null,
                  freeFlag: null,
                  expiredDate: null,
                  enableFlag: null,
                  appHomepage: null
                };
              }
            }
          }).result.then(function () {
              //console.log("thirdparty go1");
              $state.go('thirdparty', null, {reload: true});
            }, function () {
              //console.log("thirdparty go2");
              $state.go('thirdparty');
            });
        }]
      }).state('thirdparty.edit', {
        parent: 'thirdparty',
        url: "/:id/edit",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/thirdparty/thirdparty-dialog.html',
            controller: 'ThirdpartyDialogController',
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
              //console.log("thirdparty go1");
              $state.go('thirdparty', null, {reload: true});
            }, function () {
              //console.log("thirdparty go2");
              $state.go('thirdparty');
            });
        }]
      });
  }

})();
