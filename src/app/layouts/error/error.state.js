(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(stateConfig);

  stateConfig.$inject = ['$stateProvider'];

  function stateConfig($stateProvider) {
    $stateProvider
      .state('error', {
        url: '/error',
        parent: 'app',
        data: {
          authorities: [],
          pageTitle: 'error.title'
        },
        views: {
          'body': {
            templateUrl: 'app/layouts/error/error.html'
          }
        }
        //views: {
        //    'content@': {
        //        templateUrl: 'app/layouts/error/error.html'
        //    }
        //}
      })
      .state('accessdenied', {
        parent: 'app',
        url: '/accessdenied',
        views: {
          'body': {
            templateUrl: 'app/layouts/error/accessdenied.html'
          }
        }

        //views: {
        //    'content@': {
        //
        //    }
        //}
      });
  }
})();
