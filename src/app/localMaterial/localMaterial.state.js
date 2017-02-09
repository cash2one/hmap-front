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
    $stateProvider.state('localMaterial', {
      parent: 'app',
      url: "/localMaterial",
      views: {
        'body': {
          templateUrl: "app/localMaterial/localMaterial.html",
          controller: 'localMaterialController',
          controllerAs: 'vm'
        }
      }
    })
  }
})();
