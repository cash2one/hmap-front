/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditRoleController', EditRoleController);

  EditRoleController.$inject = ['RoleService', '$scope', '$state', '$uibModalInstance', 'entity'];

  function EditRoleController(RoleService, $scope, $state, $uibModalInstance, entity) {
    var vm = this;
    vm.role = entity;
    vm.clear = clear;

    vm.update = update;
    console.log("role:" + angular.toJson(vm.role));

    var role = vm.role;
    getRoleByRoleId(role);
    function getRoleByRoleId(role) {
      return RoleService.findRoles(role)
        .then(function (data) {
          vm.role = data.rows[0];
          console.log("result00000" + angular.toJson(vm.role));
        })
    }

    function update() {
      console.log("role:" + angular.toJson(vm.role));
      return RoleService.updateRoles(vm.role)
        .then(function (data) {
          console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            return $state.go('rolemanager', null, {reload: true});
          }

        })

    }


    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
