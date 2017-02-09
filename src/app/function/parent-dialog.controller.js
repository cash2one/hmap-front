/**
 * Created by zhouzy on 2016/9/1 0001.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ParentFunctionController', ParentFunctionController);

  ParentFunctionController.$inject = ['Function', 'paginationConstants', 'entity', '$state', '$uibModalInstance', '$log'];

  function ParentFunctionController(Function, paginationConstants, entity, $state, $uibModalInstance, $log) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.functions = [];
    vm.function = entity;
    vm.queryFunction = {};
    vm.selectedFunction = {};
    vm.clear = clear;
    vm.save = save;
    vm.search = search;
    vm.loadAll = loadAll;
    vm.loadFunction = loadFunction;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadAll();
    vm.loadFunction();

    function loadAll() {
      Function.query().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function search() {

      vm.queryFunction.page=vm.page;
      vm.queryFunction.pagesize= paginationConstants.itemsPerPage;
      $log.info(vm.queryFunction);
      Function.query().query(vm.queryFunction, onSuccess, onError);
    }

    function loadFunction() {
      if (vm.function.functionId) {//!= undefined && vm.function.functionId != null && vm.function.functionId != ''
        Function.query().get(vm.function, function (result) {
          vm.function = result.rows[0];
        });
      }
    }

    function onSuccess(data, headers) {
      vm.functions = data.rows;
      vm.totalItems = data.total;
    }

    function onSaveParentSuccess(data) {
      $log.info(data);
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

    function save() {
      console.log("select: ==== :"+angular.toJson(vm.selectedFunction));
      Function.shareFunction(vm.selectedFunction);
      $uibModalInstance.dismiss('cancel');
      //vm.function.parentFunctionId = vm.selectedFunction
      //Function.save().saveOrUpdate(vm.function, onSaveParentSuccess, onError);
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
