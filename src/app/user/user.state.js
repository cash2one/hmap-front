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
      .state('user', {
        parent: 'app',
        url: "/user",
        views: {
          'body': {
            templateUrl: "app/user/user.html",
            controller: 'UserController',
            controllerAs: 'vm'
          }
        }
      })
      .state('user.new', {
        parent: 'app',
        url: "/user/new",
        views: {
          'body': {
            templateUrl: "app/user/user-new.html",
            controller: 'UserNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  userId: null,
                  userName: null,
                  userType: null,
                  email: null,
                  phone: null,
                  startActiveDate: null,
                  endActiveDate: null,
                  password:null,
                  passwordEncrypted: null,
                  state: null,
                };
              }
            }
          }
        }
      })
      .state('user.edit', {
        parent: 'app',
        url: "/user/:id/edit",
        views: {
          'body': {
            templateUrl: "app/user/user-new.html",
            controller: 'UserNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function ($stateParams) {
                return {
                  id: $stateParams.id
                };
              }
            }
          }
        }
      })
  }
})();
