/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("InterfaceAuthDialogController", InterfaceAuthDialogController);

  InterfaceAuthDialogController.$inject = ['$uibModalInstance', 'entity', 'InterfaceAuthService','toastr'];

  function InterfaceAuthDialogController($uibModalInstance, entity, InterfaceAuthService,toastr) {
    var vm = this;
    vm.interfaceAuth = entity;

    vm.clear = clear;
    vm.selectAppName = selectAppName;
    vm.save = save;

    vm.selectAppName();

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    //查询所有app信息
    function selectAppName() {
      return InterfaceAuthService.selectAppName().query(onAppNameSuccess, onError);
    }

    function onAppNameSuccess(data) {
      vm.appNames = data.rows;
    }

    //保存授权
    function save() {
      vm.isSaving = true;
      //console.log(vm.interfaceAuth);
      //console.log("vm.interfaceAuth:" + vm.interfaceAuth.authId);
      InterfaceAuthService.saveInterfaceAuth().query(vm.interfaceAuth, onSaveSuccess, onError);
    }

    function onSaveSuccess(data) {
      if (data.success) {
        toastr.success('保存成功！','信息提示');
        $uibModalInstance.close();
        vm.isSaving = false;
      }
    }

    function onError(error) {
      //console.log('error');
    }
  }
})();
