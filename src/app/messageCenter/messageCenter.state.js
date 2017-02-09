(function () {
  'use strict';
  angular
    .module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('messageCenter', {
        parent: 'app',
        url: "/messageCenter",
        views: {
          'body': {
            templateUrl: "app/messageCenter/messageCenter.html",
            controller: 'MessageCenterController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
