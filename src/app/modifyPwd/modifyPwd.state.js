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
    $stateProvider.state('modifyPwd', {
      parent: 'app',
      url: "/modifyPwd",
      views: {
        'body': {
          templateUrl: "app/modifyPwd/modifyPwd.html",
          controller: 'modifyPwdController',
          controllerAs: 'vm'
        }
      }
    })
  }
})();
