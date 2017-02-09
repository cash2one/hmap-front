(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('AddAppVersionController', AddAppVersionController);

  AddAppVersionController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', '$localStorage', 'entity', '$sessionStorage', 'Upload', 'BaseConfig', 'DistributionService','toastr'];
  function AddAppVersionController($timeout, $scope, $stateParams, $uibModalInstance, $localStorage, entity, $sessionStorage, Upload, BaseConfig, DistributionService,toastr) {
    var vm = this;
    vm.addAppVersion = entity;
    vm.clear = clear;
    vm.saveAddVersion = saveAddVersion;

    //应用上传
    vm.varMayAppVersion = true;
    vm.varMaysAppVersion = false;
    vm.uploadReturn = '';
    vm.versionProgressShow = false;
    vm.progressPercentage = 0;
    vm.uploadApp = function (file) {
      vm.fileInfo = file;
      //获取文件大小
      vm.addAppVersion.appSize = (file.size/1024/1024).toFixed(1)+'MB';
      console.log("file.name:"+vm.fileSize);
      var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
      Upload.upload({
        //服务端接收
        url: BaseConfig.url + '/api/appUpload',
        headers: {
          'Authorization': 'Bearer ' + token.access_token
        },
        //上传的文件
        data: {file: file}
      }).progress(function (evt) {
        vm.versionProgressShow = true;
        //进度条
        vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        console.log('progress: ' + vm.progressPercentage + '% ' + evt.config.data.file.name);
      }).success(function (data, status, headers, config) {
        //上传成功
        console.log("服务器返回的数据：", angular.toJson(data));
        //vm.hmsAppAuth.appIcon = data.rows[0].imgThumbnailUrl;
        vm.addAppVersion.appFile = data.rows[0].objectUrl;
        if (data.rows.length > 0) {
          vm.varMayAppVersion = false;
          vm.varMaysAppVersion = true;
        } else {
          vm.varMayAppVersion = true;
          vm.varMaysAppVersion = false;
        }
        vm.uploadReturn = data;
        vm.versionProgressShow = false;
        toastr.success('应用上传成功!', '提示信息');
      }).error(function (data, status, headers, config) {
        //上传失败
        console.log('错误状态: ' + status);
      });
    };

    function saveAddVersion(){
      vm.isSaving = true;
      var url = window.location.href;
      console.log("url1:"+url);
      var index = url.indexOf("#");
      var result = url.substr(0,index);
      vm.addAppVersion.downLoadUrl = result+"#/downloadApp/";
      //vm.addAppVersion.downLoadUrl = "http://10.211.97.177:3000/#/downloadApp/";
      console.log("vm.addAppVersion:"+ vm.addAppVersion.appFile);
      DistributionService.saveAppVersion().query(vm.addAppVersion,onSaveVersionSuccess,onError);
    }

    function onSaveVersionSuccess(data){
      console.log("resultData:" + angular.toJson(data));
      if (data.success) {
        toastr.success('保存成功！','信息提示');
        $uibModalInstance.close();
        vm.isSaving = false;
      }
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function onError(){
      console.log("error");
    }
  }
})();
