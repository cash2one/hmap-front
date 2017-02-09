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
      .state('wxSetMenu', {
        parent: 'app',
        url: "/wxSetMenu",
        views: {
          'body': {
            templateUrl: "app/wxSetMenu/wxSetMenu.html",
            controller: 'WxSetMenuController',
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
      .state('wxSetMenu.new', {
        parent: 'app',
        url: "/wxSetMenu/new",
        views: {
          'body': {
            templateUrl: "app/wxSetMenu/wxSetMenu-new.html",
            controller: 'WxSetMenuNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  menuType: null,
                  menuName: null,
                  parentId: null,
                  content: null
                }
              }
            }
          }
        }
      })
      .state('wxSetMenu.edit', {
        parent: 'app',
        url: "/wxSetMenu/:id/edit",
        views: {
          'body': {
            templateUrl: "app/wxSetMenu/wxSetMenu-edit.html",
            controller: 'WxSetMenuEditController',
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
