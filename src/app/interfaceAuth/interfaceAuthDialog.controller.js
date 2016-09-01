/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("InterfaceAuthDialogController", InterfaceAuthDialogController);

  InterfaceAuthDialogController.$inject = ['$uibModalInstance','entity','InterfaceAuthService'];

  function InterfaceAuthDialogController($uibModalInstance,entity,InterfaceAuthService){
    var vm = this;
    vm.interfaceAuth = entity;
    console.log("vm.interfaceAuthDialog.headerId:" + vm.interfaceAuth.headerId);
    console.log("vm.interfaceAuthDialog.lineId:" + vm.interfaceAuth.lineId);
    vm.clear = clear;
    vm.selectAppName=selectAppName;
    vm.save = save;

    vm.selectAppName();

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function selectAppName(){
      return InterfaceAuthService.selectAppName()
        .then(function(data){
          vm.appNames = data.rows;
        })
    }

    function save() {
      vm.isSaving = true;
      console.log("vm.interfaceAuth:" + vm.interfaceAuth.authId);
      InterfaceAuthService.saveInterfaceAuth(vm.interfaceAuth)
        .then(function (data) {
          console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            vm.isSaving = false;
          }
        });
    }

  }
})();
