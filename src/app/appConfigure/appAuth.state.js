/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('appAuth', {
        parent: 'app',
        url: "/appAuth",
        views: {
          'body': {
            templateUrl: "app/appConfigure/appAuth.html",
            controller: 'AppConfigController',
            controllerAs: 'vm'
          }
        }
      })
      .state('appAuth.new', {
        parent: 'app',
        url: "/appAuth/new",
        views: {
          'body': {
            templateUrl: "app/appConfigure/appAuth-detail-new.html",
            controller: 'AppAuthDetailNewController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function () {
            ////console.log("entity:"+angular.toJson($stateParams.id));
            return {
              id: null
            };
          }
        }
      })
      .state('appAuth.detail', {
        parent: 'app',
        url: "/appAuth/:id",
        views: {
          'body': {
            templateUrl: "app/appConfigure/appAuth-detail.html",
            controller: 'AppAuthDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            ////console.log("entity:"+angular.toJson($stateParams.id));
            return {
              id: $stateParams.id
            };
          }
        }
      })
      .state('appAuth.newWeb', {
        parent: 'app',
        url: "/appAuth/web/new",
        views: {
          'body': {
            templateUrl: "app/appConfigure/appAuth-web-new.html",
            controller: 'AppAuthWebNewController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function () {
            ////console.log("entity:"+angular.toJson($stateParams.id));
            return {
              id: null
            };
          }
        }
      })
      .state('appAuth.add', {
        parent: 'appAuth',
        url: "/add",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/appConfigure/addAppAuth.html',
            controller: 'AddAppConfigController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function () {
              ////console.log("appAuth go1");
              $state.go('appAuth', null, {reload: true});
            }, function () {
              ////console.log("appAuth go2");
              $state.go('appAuth');
            });
        }]
      })
      .state('appAuth.edit', {
        parent: 'appAuth',
        url: "/edit/:id",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/appConfigure/editAppAuth.html',
            controller: 'EditAppConfigController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                ////console.log("entity:"+angular.toJson($stateParams.id));
                return {
                  id: $stateParams.id
                };
              }
            }
          }).result.then(function () {
              ////console.log("hmsappauth go1");
              $state.go('appAuth', null, {reload: true});
            }, function () {
              ////console.log("hmsappauth go2");
              $state.go('appAuth');
            });
        }]
      })
  }
})();
