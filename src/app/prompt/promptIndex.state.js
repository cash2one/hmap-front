/**
 * Created by Koma.Tshu on 2016/8/9.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('promptIndex', {
        parent: 'app',
        url: "/promptIndex",
        views: {
          'body': {
            templateUrl: "app/prompt/promptIndex.html",
            controller: 'PromptIndexController',
            controllerAs: 'vm'
          }
        },
      resolve: {
      entity: ['$stateParams',
        function ($stateParams) {
          return {
          };
        }
      ]
    }
      })
      .state('promptIndex.add', {
        parent: 'promptIndex',
        url: '/add',
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log("$uibModal:" + $uibModal);
          $uibModal.open({
            templateUrl: 'app/prompt/prompt-dialog.html',
            controller: 'PromptDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                //console.log("state entity:"+angular.toJson($stateParams.promptId));
                return {
                  promptId: null,
                  promptCode: null,
                  lang: null,
                  description: null
                };
              }
            }
          }).result.then(function () {
              //console.log("promptIndex go1");
              $state.go('promptIndex', null, {reload: true});
            }, function () {
              //console.log("promptIndex go2");
              $state.go('promptIndex');
            });
        }]
      })
      .state('promptIndex.edit', {
        parent: 'promptIndex',
        url: "/edit/:promptId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          //console.log("$stateParams.promptId:" + $stateParams.promptId);
          $uibModal.open({
            templateUrl: 'app/prompt/prompt-dialog.html',
            controller: 'PromptDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                //console.log("state entity:"+angular.toJson($stateParams.promptId));
                return {
                  promptId: $stateParams.promptId
                };
              }
            }
          }).result.then(function () {
              //console.log("promptIndex go1");
              $state.go('promptIndex', null, {reload: true});
            }, function () {
              //console.log("promptIndex go2");
              $state.go('promptIndex');
            });
        }]
      });
  }
})();
