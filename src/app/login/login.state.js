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
      .state('login', {
        url: '/login',
        views:{
          'content@':{
            templateUrl: 'app/login/login.html',
            controller: 'LoginController',
            controllerAs: 'vm'
          }
        }
      });
  }
})();
