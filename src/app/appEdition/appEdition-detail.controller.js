(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppEditionDtetailController', AppEditionDtetailController);
  AppEditionDtetailController.$inject = ['$state','AppEdition','AppEditionLineService','toastr','paginationConstants', 'entity'];
  /** @ngInject */
  function AppEditionDtetailController($state, AppEdition,AppEditionLineService,toastr,paginationConstants,entity) {
    var vm = this;
    vm.appEdition = entity;
    vm.appEditionLines =[];

    vm.page = 1;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.updateTypes = {HotPatching:'热更新',ApplicationStore:'应用商店'};
    vm.state = {Y:'是',N:'否'}
    vm.deleteAppEditionLine = deleteAppEditionLine;
    vm.editionInfo = editionInfo;
    vm.showUpdateMessage = showUpdateMessage;
    vm.setLatestEdition = setLatestEdition;
    vm.setMinimumEdition =setMinimumEdition;
    vm.openAppEditionLine = openAppEditionLine;
    vm.closeAppEditionLine = closeAppEditionLine;

    loadAll(vm.appEdition.id);
    loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);

    function loadAll(id) {
      return  AppEdition.get({id: id}, function (result) {
        vm.appEdition = result.rows[0];
      });
    }

    function loadLineAll(appEditionId,page,itemsPerPage) {
      return  AppEditionLineService.queryAppEditionLines(appEditionId,page,itemsPerPage).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            vm.appEditionLines = data.rows[0];
            vm.totalItems = data.total;
            return null;
          }

        })
    }
    function deleteAppEditionLine(appEditionLine){
      AppEditionLineService.deleteAppEditionLine(appEditionLine).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            toastr.success('删除成功！','信息提示');
            loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);
            return null;
          }
        })
    }
    function editionInfo(isMinimumEdition,isLatestEdition){
      if(isLatestEdition=='Y'&&isMinimumEdition=='Y'){
        return '最小版本|最新版本';
      }else if(isLatestEdition=='Y'){
        return '最新版本';
      }else if(isMinimumEdition=='Y'){
        return '最小版本';
      }else{
        return '';
      }
    }

    function showUpdateMessage(updateMessage){
      toastr.info(updateMessage,"更新信息",{autoDismiss:false,closeButton:true,timeOut:5000});
    }

    function setLatestEdition(appEditionLine){
      appEditionLine.isLatestEdition ='Y'
      AppEditionLineService.updateAppEditionLine(appEditionLine).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);
            toastr.success('设置最新版本成功！','信息提示');
            return null;
          }
        })
    }
    function setMinimumEdition(appEditionLine){
      appEditionLine.isMinimumEdition ='Y'
      AppEditionLineService.updateAppEditionLine(appEditionLine).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);
            toastr.success('设置最小版本成功！','信息提示');
            return null;
          }
        })
    }
    function openAppEditionLine(appEditionLine){
      appEditionLine.enableFlag ='Y'
      AppEditionLineService.updateAppEditionLine(appEditionLine).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);
            toastr.success('启用成功！','信息提示');
            return null;
          }
        })
    }
    function closeAppEditionLine(appEditionLine){
      appEditionLine.enableFlag ='N'
      AppEditionLineService.updateAppEditionLine(appEditionLine).
        then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            loadLineAll(vm.appEdition.id,vm.page,vm.itemsPerPage);
            toastr.success('禁用成功！','信息提示');
            return null;
          }
        })
    }
  }
})();
