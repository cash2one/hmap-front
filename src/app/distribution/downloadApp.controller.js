/**
 * Created by Koma.Tshu on 2016/10/13.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('DownloadAppController', DownloadAppController);

  DownloadAppController.$inject = ['$timeout', '$scope', '$stateParams', 'entity', 'DistributionService', 'Hmapfe'];
  function DownloadAppController($timeout, $scope, $stateParams, entity, DistributionService, Hmapfe) {
    var vm = this;
    vm.downloadApp = entity;
    vm.downLoad = downLoad;
    vm.getAppByRandomName = getAppByRandomName;
    vm.getAppByRandomName(vm.downloadApp);

    function getAppByRandomName(appVersion) {
      var u = navigator.userAgent;
      var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      if (isAndroid) {
        appVersion.appPlatform = 'Android';
      }
      else if (isIOS) {
        appVersion.appPlatform = 'iOS';
      }
      else {
        appVersion.appPlatform = 'Android';
      }
      if (appVersion != null) {
        Hmapfe.log("appVersion:" + appVersion.randomCode);
        Hmapfe.log("appPlatform:" + appVersion.appPlatform);
        DistributionService.getAppByRandomName().query(appVersion, onGetAppByVersionIdSuccess, onError);
      }
    }

    function onGetAppByVersionIdSuccess(data) {
      vm.downloadApp = data.rows[0];
      Hmapfe.log("downloadApp data:" + angular.toJson(vm.downloadApp));
    }

    function downLoad() {
      Hmapfe.log("download:" + vm.downloadApp.appFile);
      vm.downloadApp.id=vm.downloadApp.lastestVersionId;
      DistributionService.editDownloadNum().query(vm.downloadApp, onDownloadNumSuccess, onError);
      var installHref;
      if(vm.downloadApp.appPlatform=='iOS'){
        installHref= "itms-services://?action=download-manifest&url="+vm.downloadApp.plistUrl;
      }
      else{
        installHref = vm.downloadApp.downloadUrl;
      }
      window.location.href =installHref;
    };

    function onDownloadNumSuccess(data) {
      if (data.success) {
        Hmapfe.log("editDownloadNum success!");
      }
    }

    function onError(error) {
      Hmapfe.log('error');
    }
  }
})();
