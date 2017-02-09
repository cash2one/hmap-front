/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('WecorpAgentController',['WecorpAgentService','$state','$scope','$location','$localStorage','$sessionStorage','paginationConstants','entity','Upload','BaseConfig','SweetAlert',
    function(WecorpAgentService,$state,$scope,$location,$localStorage,$sessionStorage,paginationConstants,entity,Upload,BaseConfig,SweetAlert){
      var vm = this;
      vm.agentType = [
        {code :1, name : "消息型应用"},
        {code :2, name : "主页型应用"}
      ];
      vm.file = null;
      vm.isfile = false;
      vm.reportuserFlag = [
        {code :0, name : "不接受"},
        {code :1, name : "接受"}
      ];
      vm.reportenterFlag = [
        {code :0, name : "不上报"},
        {code :1, name : "上报"}
      ];
      vm.reportLocationFlag=[
        {code :0, name : "不上报"},
        {code :1, name : "进入会话上报"},
        {code :2, name : "持续上报"}
      ];
      vm.showSubmintButtonFlag=false;
      vm.wecorpAgent = entity;


      vm.save = save;
      vm.cancel = cancel;
      vm.cancelChooseImage = cancelChooseImage;
      vm.chooseImage = chooseImage;
      vm.setCustomMenu = setCustomMenu;

      getAgent(vm.wecorpAgent);
      function getAgent(wecorpAgent){
        WecorpAgentService.getAgent().get({
          apiHeaderName:wecorpAgent.apiHeaderName,
          agentid:wecorpAgent.agentid
        }, function(data, headers) {
          vm.agent = data.rows;
          vm.showSubmintButtonFlag = true;
        }, function(error) {
          console.log('error');
        });
      }



      function save(){
        if(vm.isfile){
        upload(vm.file);
        }else{
          WecorpAgentService.create().save(vm.agent[0],
            function(data, headers) {
              SweetAlert.success("保存成功!", {title: "提示"});
              getAgent(vm.wecorpAgent);
            }, function(error) {
              console.log('error');
            });
        }
      }
      function cancel(){
        $state.go('wecorpAgentList');
      }
      function cancelChooseImage(){
        vm.isfile = false;
        vm.file=null;
      }
      function chooseImage(){
        vm.isfile = true;
      }

      function upload(file) {
        vm.fileInfo = file;
        var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
        Upload.upload({
          //服务端接收
          url: BaseConfig.url + '/api/wecorpagent/uploadLogo',
          headers: {
            'Authorization': 'Bearer ' + token.access_token
          },
          //上传的文件
          data: {file: file}
        }).progress(function (evt) {
          //进度条
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        }).success(function (data, status, headers, config) {
          //上传成功
          vm.agent[0].logo_mediaid = data.message;
          WecorpAgentService.create().save(vm.agent[0],
            function(data, headers) {
              SweetAlert.success("保存成功!", {title: "提示"});
              getAgent(vm.wecorpAgent);
            }, function(error) {
              console.log('error');
            });
        }).error(function (data, status, headers, config) {
          //上传失败
          console.log('错误状态: ' + status);
        });
      };

      function setCustomMenu(wecorpAgent){
        $location.path("app/wecorpAgentList/"+wecorpAgent.agentid+"/wecorpAgentCustomMenu");
      }

    }]);
})();
