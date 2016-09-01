/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('rolemanager', {
        parent: 'app',
        url: "/rolemanager",
        views: {
          'body': {
            templateUrl: "app/roleManager/roleManage.html",
            controller: 'RoleManagerController',
            controllerAs: 'vm'
          }
        }
      })
      .state('rolemanager.add', {
        parent: 'rolemanager',
        url: "/rolemanager/add",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/roleManager/addRole.html',
            controller: 'AddRoleController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function () {
              console.log("role go1");
              $state.go('rolemanager', null, {reload: true});
            }, function () {
              console.log("role go2");
              $state.go('rolemanager');
            });
        }]
      })
      .state('rolemanager.edit', {
        parent: 'rolemanager',
        url: "/rolemanager/edit/:roleId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/roleManager/editRole.html',
            controller: 'EditRoleController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                console.log("entity:"+angular.toJson($stateParams.roleId));
                return {
                  roleId:$stateParams.roleId
                };
              }
            }
          }).result.then(function () {
              console.log("role go1");
              $state.go('rolemanager', null, {reload: true});
            }, function () {
              console.log("role go2");
              $state.go('rolemanager');
            });
        }]
      })
  };
})();
