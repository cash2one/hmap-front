/**
 * Created by zhouzy on 2016/8/29 0029.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('FunctionDetailController', FunctionDetailController);

  FunctionDetailController.$inject = ['$state', '$stateParams', '$uibModal', '$log', 'Function', 'entity'];

  function FunctionDetailController($state, $stateParams, $uibModal, $log, Function, entity) {
    var vm = this;
    vm.function = entity;
    vm.function.resources = [];
    vm.modalInstance = {};
    vm.isAllSelected = false;
    vm.confirmDelete = false;
    vm.saveFunctionResource = saveFunctionResource;
    vm.deleteFunctionResource = deleteFunctionResource;
    vm.saveOrUpdate = saveOrUpdate;
    vm.load = load;
    vm.loadResource = loadResource;
    vm.toggleAll = toggleAll;
    vm.isNotDelete = isNotDelete;
    vm.load();
    vm.loadResource();

    function load() {
      console.log("load function");
      if (vm.function.functionId != undefined && vm.function.functionId != null && vm.function.functionId != '') {
        Function.query().get(vm.function, function (result) {
          vm.function = result.rows[0];
        });
      }
    }

    function loadResource() {
      console.log(vm.function.functionId);
      if (vm.function.functionId) {
        Function.fetchResource().get({functionId: vm.function.functionId}, function (result) {
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
      $state.go('function');
    }

    function onError(error) {
      console.log('error');
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

    function deleteConfirm() {
      vm.modalInstance = $uibModal.open({
        animation: true,
        //component: 'deleteConfirm'
        templateUrl: 'app/tpl/deleteConfirmComponent.html',
        controller: 'DeleteComfirmController',
        controllerAs: '$ctrl'
        //template:"<delete-confirm></delete-confirm>"
      });
      console.log(vm.modalInstance);
      vm.modalInstance.result.then(function (data) {
        vm.confirmDelete = data;
        $log.info('vm.confirmDelete: ' + vm.confirmDelete);
      }, function () {
        $log.info('modal-component dismissed at: ' + new Date());
      });
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
      angular.forEach(vm.function.resources, function (res) {
        res.deleteFlag = resourceStatus;
      });
    }
  }
})();
