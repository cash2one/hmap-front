/**
 * Created by zhouzy on 2017/1/16 0016.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('DistributionUploadController', DistributionUploadController);

  DistributionUploadController.$inject = ['$state','$timeout', '$scope', '$stateParams','$localStorage', 'entity', '$sessionStorage', 'Upload', 'BaseConfig','DistributionService','toastr','Hmapfe'];
  function DistributionUploadController($state,$timeout,$scope,$stateParams,$localStorage,entity, $sessionStorage, Upload, BaseConfig,DistributionService,toastr,Hmapfe) {
    var vm = this;
    vm.distributionApp = entity;
    vm.cancel = cancel;
    vm.saveAdd = saveAdd;
    vm.submitImgFile = submitImgFile;
    vm.doUpload=doUpload;
    vm.staff = [{"code":"Android","description":"Android"},{"code":"IOS","description":"IOS"}];
    vm.load = load;
    vm.load();
    function cancel() {
      $state.go("distribution");
    }

    //打开modal加载数据
    function load() {
      if (vm.distributionApp.appId) {
        DistributionService.getApp().query(vm.distributionApp,onLoadSuccess,onError);
      }
    }
  function doUpload(){
    Hmapfe.log("doUpload");
  }
    function onLoadSuccess(data){
      Hmapfe.log("edit data:"+angular.toJson(data));
      vm.distributionApp = data.rows[0];
    }

    //新增保存
    function saveAdd() {
      vm.isSaving = true;
      var url = window.location.href;
      console.log("url1:"+url);
      var index = url.indexOf("#");
      var result = url.substr(0,index);
      vm.distributionApp.downLoadUrl = result+"#/downloadApp/";
      //vm.distributionApp.downLoadUrl = "http://10.211.97.177:3000/#/downloadApp/";
      console.log("url2:"+vm.distributionApp.downLoadUrl);
      DistributionService.saveApp().query(vm.distributionApp,onSaveSuccess,onError);
    }

    function onSaveSuccess(data){
      console.log("resultData:" + angular.toJson(data));
      if (data.success) {
        toastr.success('保存成功!', '提示信息');
        $state.go("distribution");
        vm.isSaving = false;
      }
    }
    //图片上传
    vm.icoFile = "";
    vm.uploadImg = '';
    vm.varMay = true;
    vm.varMays = false;
    vm.imgShow = false;
    //提交
    function submitImgFile() {
      uploadImg(vm.icoFile);
      if (vm.icoFile != null && vm.icoFile != undefined && vm.icoFile != "") {
        vm.imgShow = true;
      } else {
        vm.imgShow = false;
      }
    }

    //应用上传
    vm.varMayApp = true;
    vm.varMaysApp = false;
    vm.uploadReturn = '';
    vm.progressShow = false;
    vm.progressPercentage = 0;
    vm.uploadApp = function (file) {
      vm.fileInfo = file;
      //获取文件大小
      vm.distributionApp.appSize = (file.size/1024/1024).toFixed(1)+'MB';
      console.log("file.name:"+vm.distributionApp.appSize );
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
        vm.progressShow = true;
        //进度条
        vm.progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
      }).success(function (data, status, headers, config) {
        //上传成功
        console.log("服务器返回的数据：", angular.toJson(data));
        //vm.hmsAppAuth.appIcon = data.rows[0].imgThumbnailUrl;
        vm.distributionApp = data.rows[0];
        vm.distributionApp.appFile = data.rows[0].objectUrl;
        vm.distributionApp.appSize = (file.size/1024/1024).toFixed(1)+'MB';
        if (data.rows.length > 0) {
          vm.varMayApp = false;
          vm.varMaysApp = true;
        } else {
          vm.varMayApp = true;
          vm.varMaysApp = false;
        }
        vm.uploadReturn = data;
        vm.progressShow = false;
        toastr.success('应用上传成功!', '提示信息');
        //文件上传成功，进入到明细页面
        DistributionService.uploadApp=vm.distributionApp;
        $state.go('distribution.add');
      }).error(function (data, status, headers, config) {
        //上传失败
        console.log('错误状态: ' + status);
      });
    };

    function onError(error) {
      console.log('error');
    }
  }
})();
