/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddAppConfigController', AddAppConfigController);

  AddAppConfigController.$inject = ['AppAuthService', '$scope', '$state', '$uibModalInstance', '$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig'];

  function AddAppConfigController(AppAuthService, $scope, $state, $uibModalInstance, $localStorage, $sessionStorage, $timeout, Upload, BaseConfig) {
    var vm = this;
    vm.hmsAppAuth = null;
    vm.clear = clear;
    vm.add = add;
    vm.file = ""
    vm.appType = [
      {code: "客户端应用", name: "客户端应用"},
      {code: "Web应用", name: "Web应用"}
    ];

    //图片上传
    vm.uploadImg = '';
    vm.varMay = true;
    vm.varMays = false;
    vm.imgShow = false;
    //提交
    vm.submitFile = function () {
      vm.upload(vm.file);
      if (vm.file != null && vm.file != undefined && vm.file != "") {
        vm.imgShow = true;
      } else {
        vm.imgShow = false;
      }
    };
    vm.upload = function (file) {
      vm.fileInfo = file;
      var token = $localStorage.authenticationToken || $sessionStorage.authenticationToken;
      Upload.upload({
        //服务端接收
        url: BaseConfig.url + '/hms/objectUpload',
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
        console.log("服务器返回的数据：", angular.toJson(data));
        vm.hmsAppAuth.appIcon = data.rows[0].imgThumbnailUrl;
        if (data.rows.length > 0) {
          vm.varMay = false;
          vm.varMays = true;
        } else {
          vm.varMay = true;
          vm.varMays = false;
        }
        vm.uploadImg = data;
      }).error(function (data, status, headers, config) {
        //上传失败
        console.log('错误状态: ' + status);
      });
    };

    function add() {
      console.log("hmsAppAuth:" + angular.toJson(vm.hmsAppAuth));
      return AppAuthService.addAppAuth(vm.hmsAppAuth)
        .then(function (data) {
          console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            return $state.go('appauth', null, {reload: true});
          }

        });

    };

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
