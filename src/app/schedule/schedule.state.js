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
      .state('schedule', {
        parent: 'app',
        url: "/schedule",
        views: {
          'body': {
            templateUrl: "app/schedule/schedule.html",
            controller: 'ScheduleController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {};
            }
          ]
        }
      })
      .state('schedule.new', {
        parent: 'app',
        url: "/schedule/new",
        views: {
          'body': {
            templateUrl: "app/schedule/schedule-new.html",
            controller: 'ScheduleNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  info: null,
                  state: null,
                  url: null,
                  paperId: null,
                  perName: null,
                  perName2: null,
                  perTitle: null,
                  perTitle2: null,
                  perPhoto: null,
                  place: null,
                  orderNum: null,
                  time: null,
                  profile: null
                }
              }
            }
          }
        }
      })
      .state('schedule.edit', {
        parent: 'app',
        url: "/schedule/:id/edit",
        views: {
          'body': {
            templateUrl: "app/schedule/schedule-new.html",
            controller: 'ScheduleEditController',
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
