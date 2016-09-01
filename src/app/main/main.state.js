/**
 * Created by zhouzy on 2016/7/23 0023.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('main', {
        parent: 'app',
        url: "/main",
        views: {
          'body': {
            templateUrl: "app/main/main.html",
            controller: 'MainController',
            controllerAs: 'vm'
          }
        }
      });
  }

})();
