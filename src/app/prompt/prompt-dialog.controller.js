/**
 * Created by Koma.Tshu on 2016/8/12.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('PromptDialogController', PromptDialogController);

  PromptDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PromptService','toastr'];
  function PromptDialogController($timeout,$scope,$stateParams,$uibModalInstance,entity,PromptService,toastr  ){
    var vm = this;

    vm.prompt = entity;
    vm.clear = clear;
    vm.save = save;
    vm.load=load;
    vm.selectLang=selectLang;

    vm.selectLang();
    vm.load(vm.prompt);

    function selectLang(){
      return PromptService.selectLang().query(onLangSuccess,onError);
    }

    function onLangSuccess(data){
      vm.langValue = data.rows;
    }

    $timeout(function () {
      angular.element('.form-group:eq(0)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      //console.log("vm.prompt.promptId:" + vm.prompt.promptId);
      if (vm.prompt.promptId != null && vm.prompt.promptId != undefined) {
        PromptService.updatePrompt().query(vm.prompt,onSaveSuccess,onError);
      } else {
        //console.log("vm.prompt:" + vm.prompt.promptCode);
        PromptService.savePrompt().query(vm.prompt,onSaveSuccess,onError);
      }
    }

    function onSaveSuccess(data){
      //console.log("resultData:" + angular.toJson(data));
        if (data.success) {
          toastr.success('保存成功！','信息提示');
          $uibModalInstance.close();
          vm.isSaving = false;
        }
    }

    function load(promptId) {
      if (promptId != null) {
        //console.log('loadone');
        PromptService.findByPromptId().query(promptId,onLoadSuccess,onError);
      }
    }

    function onLoadSuccess(data){
      vm.prompt = data.rows[0];
    }

    function onError(error) {
      //console.log('error');
    }
  }
})();
