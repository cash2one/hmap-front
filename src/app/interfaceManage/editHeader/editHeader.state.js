/**
 * Created by user on 2016/8/4.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('editHeader', {
        parent: 'app',
        params: {
          header: ""
        },
        url: "/editHeader/{headerId}",
        views: {
          'body': {
            templateUrl: "app/interfaceManage/editHeader/editHeader.html",
            controller: 'EditHeaderController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                headerId:$stateParams.headerId

              };
            }
          ]
        }

      });
  }
})();
