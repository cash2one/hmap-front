(function () {
  'use strict';

  angular.module("hmapFront").controller("AddMessageTemplateController", AddMessageTemplateController);

  AddMessageTemplateController.$inject = ['$state','SweetAlert','MessageTemplateService'];

  function AddMessageTemplateController($state,SweetAlert,MessageTemplateService){
    var vm = this;
    vm.isSending=false;
    vm.template={};

    vm.submitInfo=submitInfo;

    function submitInfo(){
      if(vm.template.type==undefined || vm.template.type==''){
        SweetAlert.error("模板类型不能为空",{title:"提示"});
        return false;
      }
      var data={
        title:vm.template.title,
        content:vm.template.content,
        type:vm.template.type
      };
      MessageTemplateService.submitInfo().save(data,onSuccess,onError);
    }

    function onSuccess(data, headers) {
      $state.go("messageTemplate");
    }

    function onError(error) {
      vm.isSending=true;
    }

  }
})();
