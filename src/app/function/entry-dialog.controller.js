/**
 * Created by zhouzy on 2016/8/31 0031.
 */
/**
 * Created by zhouzy on 2016/8/31 0031.
 */
/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('EntryDialogController', EntryDialogController);

  EntryDialogController.$inject = ['Function', 'paginationConstants', 'entity', '$uibModalInstance', '$state', '$scope', '$log'];

  function EntryDialogController(Function, paginationConstants, entity, $uibModalInstance, $state, $scope, $log) {
    var vm = this;
    vm.page = 1;
    vm.function = entity;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.loadFunction = loadFunction;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.selectedResource = {};
    vm.clear = clear;
    vm.save = save;

    vm.loadAll();
    vm.loadFunction();

    function loadAll() {
      if (vm.function.functionId) {
        Function.fetchResource().query({
          functionId: vm.function.functionId,
          page: vm.page,
          pagesize: paginationConstants.itemsPerPage
        }, onSuccess, onError);
      }

    }

    function loadFunction() {
      if (vm.function.functionId) {//!= undefined && vm.function.functionId != null && vm.function.functionId != ''
        Function.query().get(vm.function, function (result) {
          vm.function = result.rows[0];
        });
      }
    }

    function onSuccess(data, headers) {
      vm.resources = data.rows;
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
      Function.shareEntry(vm.selectedResource);
      $uibModalInstance.dismiss('ok');
    }
  }
})();
