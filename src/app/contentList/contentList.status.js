/**
 * Created by hand on 2016/12/22.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('contentList', {
        parent: 'app',
        url: "/contentList",
        views: {
          'body': {
            templateUrl: "app/contentList/contentList.html",
            controller: 'contentController',
            controllerAs: 'vm'
          }
        }
      })
  }

})();
