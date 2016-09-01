/**
 * Created by xincai.zhang on 2016/8/12.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditAppConfigController', EditAppConfigController);

  EditAppConfigController.$inject = ['AppAuthService', '$scope', '$state', '$uibModalInstance', 'entity', 'paginationConstants', '$localStorage', '$sessionStorage', '$timeout', 'Upload', 'BaseConfig'];

  function EditAppConfigController(AppAuthService, $scope, $state, $uibModalInstance, entity, paginationConstants, $localStorage, $sessionStorage, $timeout, Upload, BaseConfig) {
    var vm = this;
    vm.hmsAppAuth = entity;
    vm.clear = clear;
    vm.update = update;
    vm.creatUUID = creatUUID;
    console.log("hmsAppAuth:" + angular.toJson(vm.hmsAppAuth));
    var hmsAppAuth = vm.hmsAppAuth;
    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    var page = vm.page;
    var pagesize = paginationConstants.itemsPerPage;

    vm.appType = [
      {code: "客户端应用", name: "客户端应用"},
      {code: "Web应用", name: "Web应用"}
    ];

    vm.uploadImg = '';
    vm.varMay = true;
    vm.varMays = false;
    //提交
    vm.submitFile = function () {
      vm.upload(vm.file);
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
    getAppAuthId(hmsAppAuth, page, pagesize);
    function getAppAuthId(hmsAppAuth, page, pagesize) {
      return AppAuthService.findAppAuth(hmsAppAuth, page, pagesize)
        .then(function (data) {
          vm.hmsAppAuth = data.rows[0];
        })
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' + vm.page);
      getAppAuthId(hmsAppAuth, vm.page, pagesize);
    };

    //刷新生成新的UUID
    function creatUUID() {
      vm.uuid = AppAuthService.generateUUID();
      console.log("新生成的UUID is ：", vm.uuid);
      vm.hmsAppAuth.appSecret = vm.uuid;
    }


    function update() {
      console.log("hmsAppAuth:" + angular.toJson(vm.hmsAppAuth));
      return AppAuthService.updateAppAuth(vm.hmsAppAuth)
        .then(function (data) {
          console.log("更新数据提交的数据:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            return $state.go('appauth', null, {reload: true});
          }

        })

    }


    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
