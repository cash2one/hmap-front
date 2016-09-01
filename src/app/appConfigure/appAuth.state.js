
/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('appauth', {
        parent: 'app',
        url: "/appauth",
        views: {
          'body': {
            templateUrl: "app/appConfigure/appConfigure.html",
            controller: 'AppConfigController',
            controllerAs: 'vm'
          }
        }
      })
      .state('appauth.add', {
        parent: 'appauth',
        url: "/appauth/add",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/appConfigure/addAppAuth.html',
            controller: 'AddAppConfigController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function () {
              console.log("appauth go1");
              $state.go('appauth', null, {reload: true});
            }, function () {
              console.log("appauth go2");
              $state.go('appauth');
            });
        }]
      })
      .state('appauth.edit', {
        parent: 'appauth',
        url: "/appauth/edit/:id",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/appConfigure/editAppAuth.html',
            controller: 'EditAppConfigController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                console.log("entity:"+angular.toJson($stateParams.id));
                return {
                  id:$stateParams.id
                };
              }
            }
          }).result.then(function () {
              console.log("hmsappauth go1");
              $state.go('appauth', null, {reload: true});
            }, function () {
              console.log("hmsappauth go2");
              $state.go('appauth');
            });
        }]
      })
  }
})();
