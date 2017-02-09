/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddRoleController', AddRoleController);

  AddRoleController.$inject = ['RoleService', '$scope', '$state', '$uibModalInstance','toastr'];

  function AddRoleController(RoleService, $scope, $state, $uibModalInstance,toastr) {
    var vm = this;
    vm.role = {};
    vm.clear = clear;
    vm.add = add;

    function add() {
      RoleService.addRole().save(vm.role,onSuccess,onError);
    };

    function onSuccess(data, headers) {
      toastr.success('保存成功！','信息提示');
      $uibModalInstance.close(data);
    }
    function onError(error) {
      //console.log('error');
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }
  }


})();
