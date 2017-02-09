/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wfInt', {
        parent: 'app',
        url: "/wfInt",
        views: {
          'body': {
            templateUrl: "app/workflowApv/wfInt/wfInt.html",
            controller: 'WfIntController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity:
            function () {
              return {
                page:null,
                pagesize:null
              };
            }
        }

      })



  }
})();
