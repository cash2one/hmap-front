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
    .controller('ResourceDialogController', ResourceDialogController);

  ResourceDialogController.$inject = ['Function', 'paginationConstants', 'entity', '$uibModalInstance','$state','toastr'];

  function ResourceDialogController(Function, paginationConstants, entity, $uibModalInstance,$state,toastr) {
    var vm = this;

    vm.function = entity;
    vm.function.resources=[];
    vm.searchResource=[];
    vm.page = 1;
    vm.search=search;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.isAllSelected = false;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.toggleAll = toggleAll;
    vm.clear = clear;
    vm.save = save;

    vm.loadAll();

    function loadAll() {
      Function.fetchNotResource().query({
        functionId: vm.function.functionId,
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function search(){
      vm.searchResource.page=vm.page;
      vm.searchResource.pagesize=paginationConstants.itemsPerPage;
      Function.queryResource().query(vm.searchResource,onSuccess,onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.resources = data.rows;
      vm.totalItems = data.total;
    }
    function onAddResourceSuccess(data) {
      toastr.success('保存成功！','信息提示');
      $uibModalInstance.close(data);
    }

    function onError(error) {
      //console.log('error');

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
      angular.forEach(vm.resources, function (res) {
        if (res.addFlag === 'Y') {
          res.__status = 'add';
          vm.function.resources.push(res);
        }
      });
      Function.updateFunctionResource().saveOrUpdate(vm.function, onAddResourceSuccess, onError);

    }

    function toggleAll() {

      var toggleStatus = !vm.isAllSelected;
      var resourceStatus = 'N';
      if (toggleStatus) {
        resourceStatus = 'N';
      }
      else {
        resourceStatus = 'Y';
      }
      angular.forEach(vm.resources, function (res) {
        res.addFlag = resourceStatus;
      });
    }
  }
})();
