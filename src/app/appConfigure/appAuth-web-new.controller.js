/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AppAuthWebNewController', AppAuthWebNewController);

  AppAuthWebNewController.$inject = ['AppAuthService', '$scope', '$state', '$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig','toastr','entity'];

  function AppAuthWebNewController(AppAuthService, $scope, $state, $localStorage, $sessionStorage, $timeout, Upload, BaseConfig,toastr,entity) {
    var vm = this;
    vm.hmsAppAuth = entity;
    vm.hmsAppAuth.appAuzMode = 'password';
    vm.save = save;
    vm.submitFile = submitFile;
    vm.upload = upload;
    vm.oldFile="assets/images/logo-header.png";
    vm.changeFile=changeFile;
    vm.clear=clear;

    vm.file = "";

    vm.appAuzMode = [
      {code: "authorization_code", name: "授权码模式"}
    ];

    function changeFile() {
      if(vm.file){
        vm.oldFile=vm.file
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
    }
    function onError(error) {
      ////console.log('error');
    }
    function clear() {
      $state.go('appAuth');
    }
  }
})();
