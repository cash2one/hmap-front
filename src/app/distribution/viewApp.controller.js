/**
 * Created by Koma.Tshu on 2016/10/13.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('ViewAppController', ViewAppController);

  ViewAppController.$inject = ['$timeout', '$scope', '$stateParams', 'entity', 'DistributionService', 'paginationConstants','Hmapfe'];
  function ViewAppController($timeout, $scope, $stateParams, entity, DistributionService, paginationConstants,Hmapfe) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.appVerion = entity;
    vm.getApp = getApp;
    vm.getAppVersion = getAppVersion;
    vm.getApp(vm.appVerion);
    vm.getAppVersion(vm.page, vm.itemsPerPage);
    function getApp() {
      if (vm.appVerion != null) {
        Hmapfe.log("handApp:" + vm.appVerion.appId);
        DistributionService.getApp().query(vm.appVerion, onGetAppSuccess, onError);
      }
    }

    function getAppVersion(page, pageSize) {
      if (vm.appVerion != null) {
        Hmapfe.log("handApp:" + vm.appVerion.appId);
        DistributionService.getAppVersion(page, pageSize).query(vm.appVerion, onGetAppVersionSuccess, onError);
      }
    }

    function onGetAppSuccess(data) {
      Hmapfe.log("appData:"+ angular.toJson(data.rows));
      vm.app = data.rows[0];
    }

    function onGetAppVersionSuccess(data) {
      Hmapfe.log("appVersion data:"+ angular.toJson(data.rows));
      vm.appVersions = data.rows;
      vm.totalItems = data.total;
    }

    vm.downLoadApp = function(fileUrl,appVersion){
      window.location.href=fileUrl;
      Hmapfe.log("appVersion::"+appVersion.downloadNum);
      DistributionService.viewEditDownloadNum().query(appVersion,onDownloadNumSuccess,onError);
    };

    function onDownloadNumSuccess(data){
      if(data.success){
        Hmapfe.log("editDownloadNum success!");
      }
    }

    function onError(error) {
      Hmapfe.log('error');
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      Hmapfe.log('Page changed to: ' + vm.page);
      vm.getAppVersion(vm.appVerion, vm.page, vm.itemsPerPage);
    }
  }
})();
