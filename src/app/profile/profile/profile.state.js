/**
 * Created by user on 2016/8/16.
 */

(function(){
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('profile', {
        parent: 'app',
        url: "/profile",
        views: {
          'body': {
            templateUrl: "app/profile/profile/profile.html",
            controller: 'ProfileController',
            controllerAs: 'vm'
          }
        }

      })
      .state('profile.new', {
        parent: 'profile',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/profile/profile/profile-dialog.html',
            controller: 'ProfileDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  profileName: null,
                  profileDesc: null
                };
              }
            }
          }).result.then(function () {
              //console.log("profile go1");
              $state.go('profile', null, {reload: true});
            }, function () {
              //console.log("profile go2");
              $state.go('profile');
            });
        }]
      }).state('profile.edit', {
        parent: 'profile',
        url: "/:id/edit",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/profile/profile/profile-dialog.html',
            controller: 'ProfileDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: $stateParams.id
                };
              }
            }
          }).result.then(function () {
              //console.log("profile go1");
              $state.go('profile', null, {reload: true});
            }, function () {
              //console.log("profile go2");
              $state.go('profile');
            });
        }]
      });
  }
})();
