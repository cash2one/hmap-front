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
      .state('remind', {
        parent: 'app',
        url: "/remind",
        views: {
          'body': {
            templateUrl: "app/remind/remind.html",
            controller: 'RemindController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {};
            }
          ]
        }
      })
      .state('remind.new', {
        parent: 'app',
        url: "/remind/new",
        views: {
          'body': {
            templateUrl: "app/remind/remind-new.html",
            controller: 'RemindNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  target: null,
                  sendTime: null,
                  megId: null,
                  info: null,
                  state: null
                }
              }
            }
          }
        }
      })
      .state('remind.edit', {
        parent: 'app',
        url: "/remind/:id/edit",
        views: {
          'body': {
            templateUrl: "app/remind/remind-new.html",
            controller: 'RemindEditController',
            controllerAs: 'vm',
            resolve: {
              entity: function ($stateParams) {
                return {
                  id: $stateParams.id
                };
              }
            }
          }
        }
      })
  }
})();
