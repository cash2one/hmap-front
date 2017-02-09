/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('wecorpAgent', {
        parent: 'app',
        url: "/wecorpAgentList/:agentid/wecorpAgent",
        views: {
          'body': {
            templateUrl: "app/wecorpAgent/wecorpAgent.html",
            controller: 'WecorpAgentController',
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
