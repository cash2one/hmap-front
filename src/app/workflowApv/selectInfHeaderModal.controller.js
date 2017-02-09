/**
 * Created by xinming on 2016/9/6.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('SelectInfHeaderModalController', SelectInfHeaderModalController);

  SelectInfHeaderModalController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'HeaderService','paginationConstants','WfSourceService'];
  function SelectInfHeaderModalController($timeout,$scope,$stateParams,$uibModalInstance,entity,HeaderService,paginationConstants,WfSourceService){
    var vm = this;
    vm.page = 1;
    vm.header = entity;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.loadHeader = loadHeader;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.selectedHeaders = {};
    vm.clear = clear;
    vm.save = save;

    vm.loadAll();
    vm.loadHeader();

    function loadAll() {
        HeaderService.queryAll().query({
          apiHeaderId: vm.header.apiHeaderId,
          page: vm.page,
          pagesize: paginationConstants.itemsPerPage
        }, onSuccess, onError);

    }

    function loadHeader() {
      if (vm.header.apiHeaderId) {//!= undefined && vm.function.functionId != null && vm.function.functionId != ''
        HeaderService.get(vm.header, function (result) {
          vm.header = result.rows[0];
        });
      }
    }

    function onSuccess(data) {
      vm.headers = data.rows;
      vm.totalItems = data.total;
    }

    function onSaveEntrySuccess(data) {
      $log.info(data);
      $uibModalInstance.close(data);
    }

    function onError(error) {
      $log.info('error');

    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      loadAll();
    };
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      $uibModalInstance.close(vm.selectedHeaders);
    }
  }
})();
