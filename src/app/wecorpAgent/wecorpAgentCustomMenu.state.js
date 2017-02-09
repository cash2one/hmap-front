/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wecorpAgentCustomMenu', {
        parent: 'app',
        url: "/wecorpAgentList/:agentid/wecorpAgentCustomMenu",
        views: {
          'body': {
            templateUrl: "app/wecorpAgent/wecorpAgentCustomMenu.html",
            controller: 'WecorpAgentCustomMenuController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                page:null,
                pagesize:null,
                agentid:$stateParams.agentid
              };
            }
          ]
        }

      });
  }
})();
