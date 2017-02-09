(function () {
  'use strict';

  angular.module("hmapFront").controller("EditMessageTemplateController", EditMessageTemplateController);

  EditMessageTemplateController.$inject = ['$state','entity','SweetAlert','MessageTemplateService'];

  function EditMessageTemplateController($state,entity,SweetAlert,MessageTemplateService){
    var vm = this;
    vm.isSending=false;
    vm.template={};

    vm.submitInfo=submitInfo;

    loadAll();
    function loadAll(){
      MessageTemplateService.selectById().query({id:entity.id},function (result) {
        vm.template=result.rows[0];
      },function (error) {

      });
    }

    function submitInfo(){
      if(vm.template.type==undefined || vm.template.type==''){
        SweetAlert.error("模板类型不能为空",{title:"提示"});
        return false;
      }
      MessageTemplateService.submitInfo().save(vm.template,onSuccess,onError);
    }

    function onSuccess(data, headers) {
      $state.go("messageTemplate");
    }

    function onError(error) {
      vm.isSending=true;
    }

  }
})();
