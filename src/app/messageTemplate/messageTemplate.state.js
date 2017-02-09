(function () {
  'use strict';
  angular
    .module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('messageTemplate', {
        parent: 'app',
        url: "/messageTemplate",
        views: {
          'body': {
            templateUrl: "app/messageTemplate/messageTemplate.html",
            controller: 'MessageTemplateController',
            controllerAs: 'vm'
          }
        }
      }).state('messageTemplate.new', {
      parent: 'app',
      url: "/addMessageTemplate",
      views: {
        'body': {
          templateUrl: "app/messageTemplate/addMessageTemplate.html",
          controller: 'AddMessageTemplateController',
          controllerAs: 'vm'
        }
      }
    }).state('messageTemplate.edit', {
      parent: 'app',
      url: "/editMessageTemplate/:id",
      views: {
        'body': {
          templateUrl: "app/messageTemplate/editMessageTemplate.html",
          controller: 'EditMessageTemplateController',
          controllerAs: 'vm',
          resolve: {
            entity: function ($stateParams) {
              return {id:$stateParams.id};
            }
          }
        }
      }
    });
  }
})();
