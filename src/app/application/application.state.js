/**
 * Created by Administrator on 2016/9/7.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('application', {
        parent: 'app',
        url: "/application",
        views: {
          'body': {
            templateUrl: "app/application/application.html",
            controller: 'ApplicationController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                };
              }
            }
          }
        }
      }).state('application.edit',{
        parent:'app',
        url:"application/edit/:id",
        views: {
          'body': {
            templateUrl: "app/application/application-edit.html",
            controller: 'ApplicationEditController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                };
              }
            }
          }
        }
      });
  }

})();
