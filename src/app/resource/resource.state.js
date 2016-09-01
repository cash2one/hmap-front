/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('resource', {
        parent: 'app',
        url: "/resource",
        views: {
          'body': {
            templateUrl: "app/resource/resource.html",
            controller: 'ResourceController',
            controllerAs: 'vm'
          }
        }
      })
      .state('resource.detail', {
        parent: 'app',
        url: "/resource/:id",
        views: {
          'body': {
            templateUrl: "app/resource/resource-detail.html",
            controller: 'ResourceDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              resourceId: $stateParams.id
            };
          }
        }
      }).state('resource.new', {
        parent: 'app',
        url: "/new/resource",
        views: {
          'body': {
            templateUrl: "app/resource/resource-detail.html",
            controller: 'ResourceDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              resourceId: null,
              name:null,
              url:null,
              type:null,
              description:null
            };
          }
        }
      });
  }

})();
