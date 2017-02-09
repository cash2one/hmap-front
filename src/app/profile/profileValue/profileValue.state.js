/**
 * Created by Administrator on 2016/9/2.
 */
(function(){
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider) {
    $stateProvider
      .state('profileValue', {
        parent: 'app',
        url: "/profileValue/{id}",
        views: {
          'body': {
            templateUrl: "app/profile/profileValue/profileValue.html",
            controller: 'ProfileValueController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              //console.log("0000="+$stateParams.id);
              return {
                id:$stateParams.id
              };
            }
          ]
        }

      })
      .state('profileValue.new', {
        parent: 'profileValue',
        url: "/newProfileValue/:id",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          //console.log($stateParams);
          $uibModal.open({
            templateUrl: 'app/profile/profileValue/profileValue-dialog.html',
            controller: 'ProfileValueDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id:null,
                  profileId:$stateParams.id,
                  valueId:null,
                  levelValue:null
                };
              }
            }
          }).result.then(function () {
              //console.log("profileValue go1");
              $state.go('profileValue', null, {reload: true});
            }, function () {
              //console.log("profileValue go2");
              $state.go('profileValue');
            });
        }]
      }).state('profileValue.edit', {
        parent: 'profileValue',
        url: "/:profileId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          //console.log( angular.toJson($stateParams));
          //console.log($state);
          $uibModal.open({
            templateUrl: 'app/profile/profileValue/profileValue-dialog.html',
            controller: 'ProfileValueDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: $stateParams.profileId
                };
              }
            }
          }).result.then(function () {
              //console.log("profileValue go1");
              $state.go('profileValue', null, {reload: true});
            }, function () {
              //console.log("profileValue go2");
              $state.go('profileValue');
            });
        }]
      });

  }
})();
