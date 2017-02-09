/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wfSource', {
        parent: 'app',
        url: "/wfSource",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfSource/wfSourceList.html",
            controller: 'WfSourceController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                page:null,
                pagesize:null
              };
            }
          ]
        }

      })
      .state('wfSource.edit', {
        parent: 'app',
        url: "/wfSource/:id",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfSource/editWfSource.html",
            controller: 'EditWfSourceController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                id:$stateParams.id
              };
            }
          ]
        }

      })
      .state('wfSource.new', {
        parent: 'app',
        url: "/new/wfSource",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfSource/editwfSource.html.html",
            controller: 'EditWfSourceController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function () {
            return {
              id: null
            };
          }
        }
      })


  }
})();
