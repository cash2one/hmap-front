/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('addHeader', {
        parent: 'app',
        params: {
          header: ""
        },
        url: "/addHeader",
        views: {
          'body': {
            templateUrl: "app/interfaceManage/addHeader/addHeader.html",
            controller: 'AddHeaderController',
            controllerAs: 'vm'
          }
        }

      });
  }
})();
