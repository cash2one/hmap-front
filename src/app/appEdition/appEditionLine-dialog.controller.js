/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppEditionLineDialogController', AppEditionLineDialogController);

  AppEditionLineDialogController.$inject = ['AppAuthService','$timeout', '$scope', '$stateParams', '$uibModalInstance','AppEdition','toastr','paginationConstants','AppEditionLineService'];

  function AppEditionLineDialogController(AppAuthService,$timeout, $scope, $stateParams, $uibModalInstance, AppEdition,toastr,paginationConstants,AppEditionLineService) {
    var vm = this;

    vm.appeditionLine = {};
    vm.appeditionLine.id = $stateParams.appEditionLineId;
    vm.appeditionLine.appEditionId =  $stateParams.id;
    vm.clear = clear;
    vm.save = save;
    vm.load = load;

    vm.appeditionLine.updateType = 'HotPatching';//默认值
    vm.appeditionLine.isMinimumEdition='N';
    vm.appeditionLine.isLatestEdition='N';
    vm.appeditionLine.enableFlag='N';
    vm.updateTypes = [
      {id:'HotPatching',name:'热更新'},
      {id:'ApplicationStore',name:'应用商店'}
    ];
    vm.state = [
      {id:'Y',name:'是'},
      {id:'N',name:'否'}
    ];
    vm.load(vm.appeditionLine.id);




    function load(id){
      if (id) {
        vm.disabled = true;
        AppEditionLineService.queryAppEditionLineById(id).
          then(function (data) {
            //console.log("resultData:" + angular.toJson(data));
            if (data.success) {
              vm.appeditionLine = data.rows[0];
            }

          })
      }
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      if (vm.appeditionLine.id !== null&&vm.appeditionLine.id!=undefined) {
        AppEditionLineService.updateAppEditionLine(vm.appeditionLine).
          then(function (data) {
            //console.log("resultData:" + angular.toJson(data));
            if (data.success) {
              toastr.success('保存成功！','信息提示');
              $uibModalInstance.close();
              return null;
            }
          })

      } else {
        AppEditionLineService.insertAppEditionLine(vm.appeditionLine).
          then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            toastr.success('保存成功！','信息提示');
            $uibModalInstance.close();
            return null;
          }
        })
      }
    }
  }
})();
