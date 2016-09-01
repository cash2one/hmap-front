/**
 * Created by Koma.Tshu on 2016/8/12.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('PromptDialogController', PromptDialogController);

  PromptDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'PromptService'];
  function PromptDialogController($timeout,$scope,$stateParams,$uibModalInstance,entity,PromptService){
    var vm = this;

    vm.prompt = entity;
    vm.clear = clear;
    vm.save = save;
    vm.load=load;
    vm.selectLang=selectLang;

    vm.selectLang();
    vm.load(vm.prompt.promptId);

    //vm.langValue = [
    //  {code : "en_GB", name : "English"},
    //  {code : "zh_CN", name : "简体中文"}
    //];

    function selectLang(){
      return PromptService.selectLang()
        .then(function(data){
          vm.langValue = data.rows;
          console.log("result00000" + angular.toJson(vm.langValue));
        })
    }

    $timeout(function () {
      angular.element('.form-group:eq(0)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      console.log("vm.prompt.promptId:" + vm.prompt.promptId);
      if (vm.prompt.promptId !== null) {
        PromptService.updatePrompt(vm.prompt)
          .then(function (data) {
            console.log("resultData:" + angular.toJson(data));
            if (data.success) {
              $uibModalInstance.close();
              vm.isSaving = false;
            }
          });
      } else {
        console.log("vm.prompt:" + vm.prompt.promptCode);
        PromptService.savePrompt(vm.prompt)
          .then(function (data) {
            console.log("resultData:" + angular.toJson(data));
            if (data.success) {
              $uibModalInstance.close();
              vm.isSaving = false;
            }
          });
      }
    }

    function load(promptId) {
      if (promptId != null) {
        console.log('loadone');
        PromptService.findByPromptId(promptId)
          .then(function(data){
            console.log("findById data:" + data.rows);
            vm.prompt = data.rows[0];
          })
      }
    }
  }
})();
