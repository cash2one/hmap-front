/**
 * Created by xinming on 2016/9/2.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('EditWfSourceController', EditWfSourceController);

  EditWfSourceController.$inject = ['$scope', '$state', '$stateParams', '$uibModal', '$log', 'WfSourceService','HeaderService', 'entity', 'paginationConstants'];

  function EditWfSourceController($scope, $state, $stateParams, $uibModal, $log, WfSourceService, HeaderService,entity, paginationConstants) {
    var vm = this;
    vm.wfSource = entity;
    vm.editOrCreate='create';
    vm.modalInstance = {};
    vm.isAllSelected = false;
    vm.confirmDelete = false;
    vm.page = 1;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;

    vm.saveOrUpdate = saveOrUpdate;
    vm.load = load;
    vm.isNotDelete = isNotDelete;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.load();
    //vm.sourceName = null;
    vm.goSelectHeader = goSelectHeader;
    vm.goSelectLine = goSelectLine;
    vm.cancel = cancel;
    //HeaderService.get(function (result) {
    //  vm.sourceName = result.rows;
    //});
    function load() {
      if (vm.wfSource.id != undefined && vm.wfSource.id != null && vm.wfSource.id != '') {
        vm.editOrCreate='edit';
        WfSourceService.get().get(vm.wfSource, function (result) {
          vm.wfSource = result.rows[0];
        });
      }
    }


    function isNotDelete(resource) {
      return resource.__status != "delete";
    }

    function saveOrUpdate() {
      if (vm.editOrCreate=='create'){
        vm.wfSource.id = null;
        WfSourceService.create().save(vm.wfSource, onSuccess, onError);
      }
      else if (vm.editOrCreate=='edit'){
        WfSourceService.edit().save(vm.wfSource, onSuccess, onError);
      }
    }
    function cancel(){
      $state.go('wfSource');
    }
    function onSuccess(data, headers) {
      $state.go('wfSource');
    }

    function onError(error) {
      console.log('error');
    }


    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' + vm.page);
    };

    function goSelectHeader(){
      $uibModal.open({
        templateUrl: 'app/workflowApv/selectInfHeaderModal.html',
        controller: 'SelectInfHeaderModalController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: {
            apiHeaderId:null
          }
        }
      }).result.then(function (result) {
          if (vm.wfSource.apiHeaderId != result.headerId){
            vm.wfSource.getWfListApiName = "";
            vm.wfSource.getWfListApiId = "";
          }
          vm.wfSource.apiHeaderId = result.headerId
          vm.wfSource.apiHeaderName = result.name

        }, function (reason) {
          console.log(reason)
        });
    }
    //跳转到接口行选择页面
    function goSelectLine(){
      $uibModal.open({
        templateUrl: 'app/workflowApv/selectInfModal.html',
        controller: 'SelectInfModalController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: {
            apiHeaderId:vm.wfSource.apiHeaderId
          }
        }
      }).result.then(function (result) {
          vm.wfSource.getWfListApiName = result.lineName;
          vm.wfSource.getWfListApiLineId = result.lineId;
        }, function (reason) {
          console.log(reason)
        });
    }

  }
})();
