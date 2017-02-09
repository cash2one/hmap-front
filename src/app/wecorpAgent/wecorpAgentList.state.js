/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wecorpAgentList', {
        parent: 'app',
        url: "/wecorpAgentList",
        views: {
          'body': {
            templateUrl: "app/wecorpAgent/wecorpAgentList.html",
            controller: 'WecorpAgentListController',
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

  }
})();
