/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('role', {
        parent: 'app',
        url: "/role",
        views: {
          'body': {
            templateUrl: "app/roleManager/roleManage.html",
            controller: 'RoleManagerController',
            controllerAs: 'vm'
          }
        }
      })
      .state('role.add', {
        parent: 'role',
        url: "/add",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/roleManager/addRole.html',
            controller: 'AddRoleController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function () {
              //console.log("role go1");
              $state.go('role', null, {reload: true});
            }, function () {
              //console.log("role go2");
              $state.go('role');
            });
        }]
      })
      .state('role.edit', {
        parent: 'role',
        url: "/edit/:roleId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          ////console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/roleManager/editRole.html',
            controller: 'EditRoleController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                //console.log("entity:"+angular.toJson($stateParams.roleId));
                return {
                  roleId:$stateParams.roleId
                };
              }
            }
          }).result.then(function () {
              //console.log("role go1");
              $state.go('role', null, {reload: true});
            }, function () {
              //console.log("role go2");
              $state.go('role');
            });
        }]
      })
  };
})();
