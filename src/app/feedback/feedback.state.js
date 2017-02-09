/**
 * Created by hand on 2016/11/3.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('feedback', {
        parent: 'app',
        url: "/feedback",
        views: {
          'body': {
            templateUrl: "app/feedback/feedback.html",
            controller: 'feedbackController',
            controllerAs: 'vm'
          }
        }
      })
  }

})();
