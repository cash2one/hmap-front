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
     .state('appEdition', {
        parent: 'app',
        url: "/appEdition",
        views: {
          'body': {
            templateUrl: "app/appEdition/appEdition.html",
            controller: 'AppEditionController',
            controllerAs: 'vm'
          }
        }
      })
      .state('appEdition.new', {
        parent: 'appEdition',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          ////console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/appEdition/appEdition-dialog.html',
            controller: 'AppEditionDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  appDesc: null,
                  appCode: null,
                  appEquipment: null,
                  appSecret: null,
                  enableFlag: null
                };
              }
            }
          }).result.then(function() {
              ////console.log("appEdition go1");
              $state.go('appEdition', null, { reload: true });
            }, function() {
              ////console.log("appEdition go2");
              $state.go('appEdition');
            });
        }]
      })
      .state('appEdition.edit', {
        parent: 'appEdition',
        url: "/:id/edit",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          ////console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/appEdition/appEdition-dialog.html',
            controller: 'AppEditionDialogController',
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
              ////console.log("appEdition go1");
              $state.go('appEdition', null, {reload: true});
            }, function () {
              ////console.log("appEdition go2");
              $state.go('appEdition');
            });
        }]
      })
      .state('appEditionLine', {
        parent: 'app',
        url: "/appEdition/:id/:appId/detail",
        views: {
          'body': {
            templateUrl: "app/appEdition/appEdition-detail.html",
            controller: 'AppEditionDtetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              //console.log("0000="+$stateParams.codeId);
              return {
                id:$stateParams.id,
                appId:$stateParams.appId
              };
            }
          ]
        }

      })
      .state('appEditionLine.new', {
        parent: 'appEditionLine',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/appEdition/appEditionLine-dialog.html',
            controller: 'AppEditionLineDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function ($stateParams) {
                return {
                  appEditionId:$stateParams.id,
                  appEditionLineId:null
                };
              }
            }
          }).result.then(function() {
              ////console.log("appEdition go1");
              $state.go('appEditionLine', null, { reload: true });
            }, function() {
              ////console.log("appEdition go2");
              $state.go('appEditionLine');
            });
        }]
      })
      .state('appEditionLine.edit', {
        parent: 'appEditionLine',
        url: "/edit/:appEditionLineId/",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/appEdition/appEditionLine-dialog.html',
            controller: 'AppEditionLineDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function() {
              ////console.log("appEdition go1");
              $state.go('appEditionLine', null, { reload: true });
            }, function() {
              ////console.log("appEdition go2");
              $state.go('appEditionLine');
            });
        }]
      })
  }

})();
