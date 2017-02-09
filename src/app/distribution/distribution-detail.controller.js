/**
 * Created by Koma.Tshu on 2016/10/12.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('DistributionDetailController', DistributionDetailController);

  DistributionDetailController.$inject = ['$state', '$timeout', '$scope', '$stateParams', '$localStorage', 'entity', '$sessionStorage', 'Upload', 'BaseConfig', 'DistributionService', 'toastr', 'Hmapfe'];
  function DistributionDetailController($state, $timeout, $scope, $stateParams, $localStorage, entity, $sessionStorage, Upload, BaseConfig, DistributionService, toastr, Hmapfe) {
    Hmapfe.log("have came in AddAppController...");
    var vm = this;
    vm.distributionApp = entity;
    vm.cancel = cancel;
    vm.saveAdd = saveAdd;
    vm.submitImgFile = submitImgFile;
    vm.staff = [{"code": "Android", "description": "Android"}, {"code": "IOS", "description": "IOS"}];
    vm.load = load;
    vm.load();

    function cancel() {
      $state.go("distribution");
    }

    //打开modal加载数据
    function load() {
      if (vm.distributionApp.appId) {
        DistributionService.getApp().query(vm.distributionApp, onLoadSuccess, onError);
      } else {
        vm.distributionApp = DistributionService.uploadApp;
      }
    }

    function onLoadSuccess(data) {
      Hmapfe.log("edit data:" + angular.toJson(data));
      vm.distributionApp = data.rows[0];
    }

    //新增保存
    function saveAdd() {
      vm.isSaving = true;
      var url = window.location.href;
      console.log("url1:" + url);
      var index = url.indexOf("#");
      var result = url.substr(0, index);
      vm.distributionApp.downLoadUrl = result + "#/downloadApp/";
      //vm.distributionApp.downLoadUrl = "http://10.211.97.177:3000/#/downloadApp/";
      console.log("url2:" + vm.distributionApp.downLoadUrl);
      DistributionService.saveApp().query(vm.distributionApp, onSaveSuccess, onError);
    }

    function onSaveSuccess(data) {
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

    function onError(error) {
      console.log('error');
    }
  }
})();
