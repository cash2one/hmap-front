/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('header', {
        parent: 'app',
        url: "/header",
        views: {
          'body': {
            templateUrl: "app/interfaceManage/header/header.html",
            controller: 'HeaderController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                page: null,
                pagesize: null
              };
            }
          ]
        }

      })
      .state('header.edit', {
        parent: 'app',
        params: {
          header: ""
        },
        url: "/header/{headerId}",
        views: {
          'body': {
            templateUrl: "app/interfaceManage/header/header-detail.html",
            controller: 'HeaderDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                headerId: $stateParams.headerId

              };
            }
          ]
        }

      })
      .state('header.new', {
        parent: 'app',
        params: {
          header: ""
        },
        url: "/new/header",
        views: {
          'body': {
            templateUrl: "app/interfaceManage/header/header-detail.html",
            controller: 'HeaderDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function () {
            return {
              headerId: null
            };
          }
        }
      });
  }
})();
