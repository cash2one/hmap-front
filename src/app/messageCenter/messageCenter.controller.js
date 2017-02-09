(function () {
  'use strict';

  angular.module("hmapFront")
    .controller("MessageCenterController", MessageCenterController);

  MessageCenterController.$inject = ['$state','MessageCenterService'];

  function MessageCenterController($state,MessageCenterService){
    var vm = this;
    vm.isSending=false;
    vm.pushMethod='jPush';
    vm.jpushType='registration';
    vm.contentVar={};

    vm.sendMessage=sendMessage;
    vm.selectTemplate=selectTemplate;

    loadAll();
    function loadAll(){
      MessageCenterService.queryMessageTemplate().query({},function (data) {
        vm.templates=data.rows[0];
      },function (error) {
      });
    }

    function sendMessage(){
        var data={
          pushMethod:vm.pushMethod,
          jpushType:vm.jpushType,
          sendObject:vm.sendObject,
          templateId:vm.templates[vm.pushMethod][vm.messageTemplateIndex].id,
          contentVar:angular.toJson(vm.contentVar)
        };
      MessageCenterService.sendMessage().query(data,onSuccess,onError)
    }

    function selectTemplate(){
      vm.messageTemplateId=vm.templates[vm.pushMethod][vm.messageTemplateIndex].id;
      vm.requestMsg=vm.templates[vm.pushMethod][vm.messageTemplateIndex].content;
    }

    function onSuccess(data) {
      vm.isSending=false;
      vm.retMsg="发送成功";
    }
    function onError(error) {
      vm.isSending=false;
      vm.retMsg="发送失败";
    }
  }
})();
