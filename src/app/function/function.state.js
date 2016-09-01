/**
 * Created by zhouzy on 2016/8/30 0030.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('function', {
        parent: 'app',
        url: "/function",
        views: {
          'body': {
            templateUrl: "app/function/function.html",
            controller: 'FunctionController',
            controllerAs: 'vm'
          }
        }
      })
      .state('function.detail', {
        parent: 'app',
        url: "/function/:id",
        views: {
          'body': {
            templateUrl: "app/function/function-detail.html",
            controller: 'FunctionDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              functionId: $stateParams.id
            };
          }
        }
      }).state('function.new', {
        parent: 'app',
        url: "/new/function",
        views: {
          'body': {
            templateUrl: "app/function/function-detail.html",
            controller: 'FunctionDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function () {
            return {
              functionId: null
            };
          }
        }
      })
      .state('function.addResource', {
        parent: 'function.detail',
        url: "/addResource",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/function/resource-dialog.html',
            controller: 'ResourceDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  functionId: $stateParams.id
                };
              }
            }
          }).result.then(function () {
              $state.go('function.detail', null, {reload: true});
            }, function () {
              console.log("function.detail go2");
            });
        }]
      });
  }

})();
