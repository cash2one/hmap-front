/**
 * Created by user on 2016/8/16.
 */

(function(){
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('interfaceList', {
        parent: 'app',
        url: "/interfaceList",
        views: {
          'body': {
            templateUrl: "app/interfaceTest/interfaceList.html",
            controller: 'InterfaceListController',
            controllerAs: 'vm'
          }
        }

      });
  }
})();
