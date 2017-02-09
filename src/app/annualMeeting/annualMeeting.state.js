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
      .state('annualMeeting', {
        parent: 'app',
        url: "/annualMeeting",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting.html",
            controller: 'AnnualMeetingController',
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
      .state('annualMeeting.new', {
        parent: 'app',
        url: "/annualMeeting/new",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting-new.html",
            controller: 'AnnualMeetingNewController',
            controllerAs: 'vm',
            resolve: {
              entity: function () {
                return {
                  hmsAnnualMeeting: {
                    id: null,
                    statusCode: null,
                    gender: null,
                    fullName: null,
                    cellPhone: null,
                    wxopenId: null,
                    email: null,
                    sign: null,
                    parkNum: null,
                    joinAct: null,
                    isStaff: null,
                    state: null,
                    approveName: null,
                    approveDate: null,
                    equipment: null,
                    source: null,
                    sn: null,
                    companyName: null,
                    title: null,
                    inviter: null,
                    inviterId: null,
                    attribute1: null
                  },
                  splitList: []
                }
              }
            }
          }
        }
      })
      .state('annualMeeting.edit', {
        parent: 'app',
        url: "/annualMeeting/:id/edit",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting-new.html",
            controller: 'AnnualMeetingNewController',
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
      .state('annualMeeting.show', {
        parent: 'app',
        url: "/annualMeeting/:id/show",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting-show.html",
            controller: 'AnnualMeetingShowController',
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
      .state('annualMeeting.meetThousand', {
        parent: 'app',
        url: "/annualMeeting/meetThousand",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/meet-thousand.html",
            controller: 'faceEcognitionMeetThousandCtrl',
            controllerAs: 'vm',
            resolve: {
              entity: function ($stateParams) {
                return {};
              }
            }
          }
        }
      })
      .state('annualMeeting.seat', {
        parent: 'app',
        url: "/annualMeeting/:id&:needSplit/seat",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting-seat.html",
            controller: 'AnnualMeetingSeatController',
            controllerAs: 'vm',
            resolve: {
              entity: function ($stateParams) {
                return {
                  id: $stateParams.id,
                  needSplit: $stateParams.needSplit
                };
              }
            }
          }
        }
      })
      .state('meetingUsers', {
        parent: 'app',
        url: "/annualMeeting/:id/meetingUsers",
        views: {
          'body': {
            templateUrl: "app/annualMeeting/annualMeeting-user.html",
            controller: 'AnnualMeetingUserController',
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
      .state('meetingUsers.change', {
        parent: 'meetingUsers',
        url: "/:userId&:meetingId/userChange",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/annualMeeting/user-change.html',
            controller: 'userChangeController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  userId: $stateParams.userId,
                  meetingId: $stateParams.meetingId
                };
              }
            }
          }).result.then(function () {
              $state.go('meetingUsers', null, {reload: true});
            }, function () {
              $state.go('meetingUsers', null, {reload: true});
            });
        }]
      });
  }
})();
