/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wfTemp', {
        parent: 'app',
        url: "/wfSource/:sourceId/wfTemp",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfTemp/wfTempList.html",
            controller: 'WfTempController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                page:null,
                pagesize:null,
                sourceId:$stateParams.sourceId
              };
            }
          ]
        }

      })
      .state('wfTemp.edit', {
        parent: 'app',
        url: "/wfSource/:sourceId/wfTemp/:id",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfTemp/editWfTemp.html",
            controller: 'EditWfTempController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                id:$stateParams.id,
                sourceId:$stateParams.sourceId
              };
            }
          ]
        }

      })
      .state('wfTemp.new', {
        parent: 'app',
        url: "/new/wfTemp",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfTemp/editWfTemp.html",
            controller: 'EditWfTempController',
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
      .state('wfTemp.wfConditionTypeEdit', {
        parent: 'app',
        url: "/wfSource/:sourceId/wfTemp/wfConditionType/:id",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfConditionType/editWfConditionType.html",
            controller: 'EditWfConditionTypeController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                id:$stateParams.id,
                sourceId:$stateParams.sourceId
              };
            }
          ]
        }

      })
      .state('wfTemp.wfConditionTypeNew', {
        parent: 'app',
        url: "/new/wfConditionType",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfConditionType/editWfConditionType.html",
            controller: 'EditWfConditionTypeController',
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
