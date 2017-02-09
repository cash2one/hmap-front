/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditRoleController', EditRoleController);

  EditRoleController.$inject = ['RoleService', '$scope', '$state', '$uibModalInstance', 'entity','toastr','Hmapfe'];

  function EditRoleController(RoleService, $scope, $state, $uibModalInstance, entity,toastr,Hmapfe) {
    var vm = this;
    vm.role = entity;
    vm.clear = clear;
    vm.update = update;
    vm.loadRole=loadRole;
    vm.loadRole();

    function loadRole() {
      Hmapfe.log('edit role');
      Hmapfe.log(vm.role);
      RoleService.findRoles().query(vm.role
        , onRoleSuccess, onError);
    }

    function update() {
      RoleService.updateRoles().save(vm.role,onSuccess,onError);
    };

    function onRoleSuccess(data, headers) {
      vm.role = data.rows[0];
    }

    function onSuccess(data, headers) {
      toastr.success('保存成功！','信息提示');
      $uibModalInstance.close(data);
    }
    function onError(error) {
      //console.log('error');
    }


    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }
  }


})();
