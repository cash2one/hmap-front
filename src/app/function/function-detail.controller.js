/**
 * Created by zhouzy on 2016/8/29 0029.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('FunctionDetailController', FunctionDetailController);

  FunctionDetailController.$inject = ['$scope', '$state', '$stateParams', '$uibModal', '$log', 'Function', 'entity', 'paginationConstants','toastr'];

  function FunctionDetailController($scope, $state, $stateParams, $uibModal, $log, Function, entity, paginationConstants,toastr) {
    var vm = this;
    vm.function = entity;
    vm.editOrCreate='create'
    vm.function.resources = [];
    vm.modalInstance = {};
    vm.isAllSelected = false;
    vm.confirmDelete = false;
    vm.page = 1;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.saveFunctionResource = saveFunctionResource;
    vm.deleteFunctionResource = deleteFunctionResource;
    vm.saveOrUpdate = saveOrUpdate;
    vm.load = load;
    vm.loadResource = loadResource;
    vm.toggleAll = toggleAll;
    vm.isNotDelete = isNotDelete;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.load();


    function load() {
      if (vm.function.functionId != undefined && vm.function.functionId != null && vm.function.functionId != '') {
        vm.editOrCreate='Edit';
        Function.query().get(vm.function, function (result) {
          vm.function = result.rows[0];
          vm.loadResource();
        });
      }
    }

    function loadResource() {
      if (vm.function.functionId) {
        Function.fetchResource().get({
          functionId: vm.function.functionId, page: vm.page,
          pagesize: paginationConstants.itemsPerPage
        }, function (result) {
          vm.function.resources = result.rows;
        });
      }
    }

    function isNotDelete(resource) {
      return resource.__status != "delete";
    }

    function saveOrUpdate() {
      Function.save().saveOrUpdate(vm.function, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      toastr.success('保存成功！','信息提示');
      $state.go('function');
    }

    function onError(error) {
      //console.log('error');
    }

    function saveFunctionResource() {
      Function.updateFunctionResource().saveOrUpdate(vm.function, onSuccess, onError);
    }

    //将选中的数据状态标记为删除
    function deleteFunctionResource() {
      // deleteConfirm();
      angular.forEach(vm.function.resources, function (res) {
        if (res.deleteFlag == "Y") {
          res.__status = "delete";
        }
      });
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      loadResource();
    };

    function toggleAll() {
      var toggleStatus = !vm.isAllSelected;
      var resourceStatus = 'N';
      if (toggleStatus) {
        resourceStatus = 'N';
      }
      else {
        resourceStatus = 'Y';
      }
      angular.forEach(vm.function.resources, function (res) {
        res.deleteFlag = resourceStatus;
      });
    }

    $scope.$on('handleSelectedFunction', function() {
      //console.log(Function.selectedFunction.functionName);
      vm.function.parentFunctionId = Function.selectedFunction.functionId
      vm.function.parentFunctionName = Function.selectedFunction.functionName
    });

    $scope.$on('handleSelectedEntry', function() {
      //console.log(Function.selectedEntry.resourceName);
      vm.function.resourceId = Function.selectedEntry.resourceId
      vm.function.resourceName = Function.selectedEntry.name
    });
  }
})();
