/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AppAuthDetailController', AppAuthDetailController);

  AppAuthDetailController.$inject = ['AppAuthService', '$scope', '$state', '$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig','toastr','entity'];

  function AppAuthDetailController(AppAuthService, $scope, $state, $localStorage, $sessionStorage, $timeout, Upload, BaseConfig,toastr,entity) {
    var vm = this;
    vm.hmsAppAuth = entity;
    vm.hmsAppAuth.appAuzMode = 'password';
    vm.save = save;
    vm.submitFile = submitFile;
    vm.upload = upload;
    vm.changeType = changeType;
    vm.load=load;
    vm.oldFile="assets/images/logo-header.png";
    vm.changeFile=changeFile;
    vm.clear = clear;
    vm.ischecked="";
    vm.mouseIn="";
    vm.permissions=[];
    vm.check=check;
    vm.nocheck=nocheck;
    vm.refreshSecret=refreshSecret;
    vm.savePermission=savePermission;
    vm.getPermission=getPermission;
    vm.permissionData=[];

    vm.load(entity.id);

    vm.file = "";
    vm.appType = [
      {code: "客户端应用", name: "客户端应用"},
      {code: "Web应用", name: "Web应用"}
    ];

    vm.appAuzMode = [
      {code: "password", name: "密码模式"},
      {code: "client_credentials", name: "客户端模式"}
    ];

    function changeFile() {
      if(vm.file){
        vm.oldFile=vm.file
      }
    }
    function changeType(){
      if(vm.hmsAppAuth.appType === "客户端应用"){
        vm.hmsAppAuth.appAuzMode = 'password';
        vm.appAuzMode = [
          {code: "password", name: "密码模式"},
          {code: "client_credentials", name: "客户端模式"}
        ];
      }else if(vm.hmsAppAuth.appType === "Web应用"){
        vm.hmsAppAuth.appAuzMode = 'authorization_code';
        vm.appAuzMode = [
          {code: "authorization_code", name: "授权码模式"}
        ];
      }
    }

    function load(id) {
      if(id){
        AppAuthService.getAppAuth().query({id: id}, function (result) {
          vm.hmsAppAuth = result.rows[0];
          vm.getPermission();
          vm.oldFile=vm.hmsAppAuth.appIcon;
          if (vm.hmsAppAuth.appType === "客户端应用") {
            vm.appType = [
              {code: "客户端应用", name: "客户端应用"},
              {code: "Web应用", name: "Web应用"}
            ];
          } else if (vm.hmsAppAuth.appType === "Web应用") {
            vm.appAuzMode = [
              {code: "authorization_code", name: "授权码模式"},
            ];
          }
        });
      }
    }
    //图片上传
    vm.uploadImg = '';
    vm.varMay = true;
    vm.varMays = false;
    vm.imgShow = false;
    //提交
    function submitFile() {
      if(vm.oldFile!="../assets/images/logo-header.png"){
        vm.file=vm.oldFile;
      }
      upload(vm.file);
      if (vm.file != null && vm.file != undefined && vm.file != "") {
        vm.imgShow = true;
      } else {
        vm.imgShow = false;
      }
    };

    function upload(file) {
      vm.fileInfo = file;
      var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
      Upload.upload({
        //服务端接收
        url: BaseConfig.url + '/api/imageUpload',
        headers: {
          'Authorization': 'Bearer ' + token.access_token,
          'X-Requested-With':'XMLHttpRequest'
        },
        //上传的文件
        data: {file: file}
      }).progress(function (evt) {
        //进度条
        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function (data, status, headers, config) {
        //上传成功
        ////console.log("服务器返回的数据：", angular.toJson(data));
        //vm.hmsAppAuth.appIcon = data.rows[0].imgThumbnailUrl;
        vm.hmsAppAuth.appIcon = data.rows[0].objectUrl;
        if (data.rows.length > 0) {
          vm.varMay = false;
          vm.varMays = true;
        } else {
          vm.varMay = true;
          vm.varMays = false;
        }
        vm.uploadImg = data;
        toastr.success('图片上传成功!', '提示信息');
        vm.save();
      }).error(function (data, status, headers, config) {
        //上传失败
        ////console.log('错误状态: ' + status);
      });
    };

    function save() {
      AppAuthService.insertOrUpdateAppAuth().save(vm.hmsAppAuth, onSuccess, onError);
    };
    function onSuccess(data, headers) {
      //vm.hmsAppAuth=data.rows[0];
      toastr.success('保存成功!', '提示信息');
      vm.ischecked="";
      vm.mouseIn="";
    }
    function onError(error) {
      ////console.log('error');
    }
    function clear() {
      $state.go('appAuth');
    }
    function check(name) {
      vm.ischecked=name;
    }
    function nocheck($event) {
      vm.ischecked="";
      $event.stopPropagation();
    }
    function refreshSecret() {
      vm.uuid = AppAuthService.generateUUID();
      vm.hmsAppAuth.appSecret = vm.uuid;
      vm.save();
    }
    function savePermission() {
      vm.permissions=[];
      for(var i=0;i<vm.permissionData.length;i++){
        var permissionId="";
        if(vm.permissionData[i].id){
          permissionId=vm.permissionData[i].id;
        }else{
          permissionId=AppAuthService.generateUUID();
        }
        vm.permissions.push({id:permissionId,dataIcon:vm.permissionData[i].dataIcon,dataId:vm.hmsAppAuth.id,
          dataType:vm.permissionData[i].dataType,dataValue:vm.permissionData[i].dataValue,valueId:vm.permissionData[i].dataId,
          visibilityType:vm.hmsAppAuth.appName})
      }
      AppAuthService.savePermissionData(vm.hmsAppAuth.id).save(vm.permissions, onSuccess, onError);
    }
    function getPermission(){
      AppAuthService.getPermissionData().query({id: vm.hmsAppAuth.id}, function (data){
        vm.result = data.rows;
        for(var i=0;i<vm.result.length;i++){
          vm.permissionData.push({id:vm.result[i].id,dataIcon:vm.result[i].dataIcon,dataType:vm.result[i].dataType,
            dataValue:vm.result[i].dataValue,dataId:vm.result[i].valueId})
        }
      });
    }
  }
})();
