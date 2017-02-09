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
      .state('device', {
        parent: 'app',
        url: "/device",
        views: {
          'body': {
            templateUrl: "app/device/device.html",
            controller: 'DeviceController',
            controllerAs: 'vm'
          }
        }
      }).state('device.detail', {
        parent: 'app',
        url: "/device/:id",
        views: {
          'body': {
            templateUrl: "app/device/device-detail.html",
            controller: 'DeviceDetailController',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
