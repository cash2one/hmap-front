/**
 * Created by zhouzy on 2016/9/23 0023.
 */
/**
 * Created by zhouzy on 2016/7/31 0031.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('SysConfigDialogController', SysConfigDialogController);

  SysConfigDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'SysConfig','toastr'];

  function SysConfigDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, SysConfig,toastr) {
    var vm = this;
    vm.sysConfig = entity;
    vm.isSystem = false;
    vm.configLevelType = ["SYSTEM", "USER"];
    vm.clear = clear;
    vm.save = save;
    vm.load = load;
    vm.load(vm.sysConfig.id);

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      //console.log(vm.sysConfig);
      SysConfig.saveOrUpdate().saveOrUpdate(vm.sysConfig, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(result) {
      //console.log(result);
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:sysConfigUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = false;
    }

    function onSaveError() {
      vm.isSaving = false;
    }

    function load(id) {
      if (id) {
        SysConfig.query().query(vm.sysConfig, function (result) {
          vm.sysConfig = result.rows[0];
          if (vm.sysConfig.configLevel === 'SYSTEM') {
            vm.isSystem = true;
          }
          else {
            vm.isSystem = false;
          }
        });
      }

    }

  }
})();
