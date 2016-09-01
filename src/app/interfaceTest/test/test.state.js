/**
 * Created by user on 2016/8/23.
 */
(function(){
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('test', {
        parent: 'app',
        url: "/test/{lineId}",
        views: {
          'body': {
            templateUrl: "app/interfaceTest/test/test.html",
            controller: 'TestController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                lineId:$stateParams.lineId

              };
            }
          ]
        }

      });
  }
})();
