/**
 * Created by zhouzy on 2016/8/18 0018.
 */
/**
 * Created by zhouzy on 2016/7/23 0023.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('options', {
        parent: 'app',
        url: "/options",
        views: {
          'body': {
            templateUrl: "app/options/options.html",
            controller: 'OptionsController',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
