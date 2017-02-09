/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddAppConfigController', AddAppConfigController);

  AddAppConfigController.$inject = ['AppAuthService', '$scope', '$state', '$uibModalInstance', '$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig','toastr'];

  function AddAppConfigController(AppAuthService, $scope, $state, $uibModalInstance, $localStorage, $sessionStorage, $timeout, Upload, BaseConfig,toastr) {
    var vm = this;
    vm.hmsAppAuth = {};
    vm.hmsAppAuth.appAuzMode = 'password';

    vm.clear = clear;
    vm.add = add;
    vm.submitFile = submitFile;
    vm.upload = upload;
    vm.changeType = changeType;


    vm.file = ""
    vm.appType = [
      {code: "客户端应用", name: "客户端应用"},
      {code: "Web应用", name: "Web应用"}
    ];

    vm.appAuzMode = [
      {code: "password", name: "密码模式"},
      {code: "client_credentials", name: "客户端模式"}
    ];

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
          {code: "authorization_code", name: "授权码模式"},
        ];
      }
    };

    //图片上传
    vm.uploadImg = '';
    vm.varMay = true;
    vm.varMays = false;
    vm.imgShow = false;
    //提交
    function submitFile() {
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
      }).error(function (data, status, headers, config) {
        //上传失败
        ////console.log('错误状态: ' + status);
      });
    };

    function add() {
      AppAuthService.insertOrUpdateAppAuth().save(vm.hmsAppAuth, onSuccess, onError);
    };
    function onSuccess(data, headers) {
      toastr.success('保存成功！','信息提示');
      $uibModalInstance.close(data);
    }

    function onError(error) {
      ////console.log('error');
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
