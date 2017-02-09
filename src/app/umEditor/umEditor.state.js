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
      .state('umEditor', {
        parent: 'app',
        url: "/umEditor",
        views: {
          'body': {
            templateUrl: "app/umEditor/umeditor.html",
            controller: 'umEditorController',
            controllerAs: 'vm'
          }
        }
      })
      .state('perview', {
        params:{'perviews':null},
        parent: 'app',
        url: "/umEditor",
        views: {
          'body': {
            templateUrl: "app/umEditor/perview.html",
            controller: 'PerviewController',
            controllerAs: 'vm'
          }
        }
      })
  }
})();
