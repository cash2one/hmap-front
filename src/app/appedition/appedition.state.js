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
     .state('appedition', {
        parent: 'app',
        url: "/appedition",
        views: {
          'body': {
            templateUrl: "app/appedition/appedition.html",
            controller: 'AppeditionController',
            controllerAs: 'vm'
          }
        }
      })
      .state('appedition.new', {
        parent: 'appedition',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function($stateParams, $state, $uibModal) {
          console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/appedition/appedition-dialog.html',
            controller: 'AppeditionDialogController',
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
                  enableFlag: null,
                };
              }
            }
          }).result.then(function() {
              console.log("appedition go1");
              $state.go('appedition', null, { reload: true });
            }, function() {
              console.log("appedition go2");
              $state.go('appedition');
            });
        }]
      })
      .state('appedition.edit', {
        parent: 'appedition',
        url: "/:id/edit",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/appedition/appedition-dialog.html',
            controller: 'AppeditionDialogController',
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
              console.log("appedition go1");
              $state.go('appedition', null, {reload: true});
            }, function () {
              console.log("appedition go2");
              $state.go('appedition');
            });
        }]
      })
  }

})();
