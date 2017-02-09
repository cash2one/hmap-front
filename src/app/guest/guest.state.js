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
      .state('guest', {
        parent: 'app',
        url: "/guest",
        views: {
          'body': {
            templateUrl: "app/guest/guest.html",
            controller: 'GuestController',
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
      });
      //.state('guest.new', {
      //  parent: 'app',
      //  url: "/guest/new",
      //  views: {
      //    'body': {
      //      templateUrl: "app/guest/guest-new.html",
      //      controller: 'GuestNewController',
      //      controllerAs: 'vm',
      //      resolve: {
      //        entity: function () {
      //          return {
      //            id: null,
      //            statusCode: null,
      //            gender: null,
      //            fullName: null,
      //            cellPhone: null,
      //            wxopenId: null,
      //            email: null,
      //            sign: null,
      //            parkNum: null,
      //            joinAct: null,
      //            isStaff: null,
      //            state: null,
      //            approveName: null,
      //            approveDate: null,
      //            equipment: null,
      //            source: null,
      //            sn: null,
      //            companyName: null,
      //            title: null,
      //            inviter: null,
      //            inviterId: null
      //          }
      //        }
      //      }
      //    }
      //  }
      //})
      //.state('guest.edit', {
      //  parent: 'app',
      //  url: "/guest/:id/edit",
      //  views: {
      //    'body': {
      //      templateUrl: "app/guest/guest-new.html",
      //      controller: 'guestNewController',
      //      controllerAs: 'vm',
      //      resolve: {
      //        entity: function ($stateParams) {
      //          return {
      //            id: $stateParams.id
      //          };
      //        }
      //      }
      //    }
      //  }
      //})
  }
})();
