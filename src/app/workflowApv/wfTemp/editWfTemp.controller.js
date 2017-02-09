/**
 * Created by xinming on 2016/9/2.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('EditWfTempController', EditWfTempController);

  EditWfTempController.$inject = ['$scope', '$state', '$stateParams', '$uibModal', '$log', 'WfTempService','WfSourceService', 'entity', 'paginationConstants'];

  function EditWfTempController($scope, $state, $stateParams, $uibModal, $log, WfTempService, WfSourceService,entity, paginationConstants) {
    var vm = this;
    vm.wfTemp = entity;
    //来源系统ID和名称

    vm.sourceId = vm.wfTemp.sourceId;

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
    vm.goSelectLine = goSelectLine;
    vm.cancel = cancel;
    //HeaderService.get(function (result) {
    //  vm.sourceName = result.rows;
    //});
    function load() {
      if (vm.wfTemp.id != undefined && vm.wfTemp.id != null && vm.wfTemp.id != '') {
        vm.editOrCreate='edit';
        WfTempService.get().get(vm.wfTemp, function (result) {
          vm.wfTemp = result.rows[0];
        });
      }else{
        getWfSource(vm.sourceId);
      }
    }

    function getWfSource(id){
      WfSourceService.get().get({
        id:id
      }, function(data){
        vm.wfTemp.apiHeaderId = data.rows[0].apiHeaderId;
        vm.wfTemp.apiHeaderName = data.rows[0].apiHeaderName;
        vm.wfTemp.getWfListApiName = data.rows[0].getWfListApiName;
      }, function(){
        console.log('error');
      });
    }

    function isNotDelete(resource) {
      return resource.__status != "delete";
    }

    function saveOrUpdate() {
      if (vm.editOrCreate=='create'){
        vm.wfTemp.id = null;
        WfTempService.create().save(vm.wfTemp, onSuccess, onError);
      }
      else if (vm.editOrCreate=='edit'){
        WfTempService.edit().save(vm.wfTemp, onSuccess, onError);
      }
    }
    function cancel(){
      //alert(vm.sourceId)
      $state.go('wfTemp',{sourceId:vm.sourceId});
    }
    function onSuccess(data, headers) {
      $state.go('wfTemp',{sourceId:vm.sourceId});
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
    //跳转到接口行选择页面
    function goSelectLine(interfaceType){
      $uibModal.open({
        templateUrl: 'app/workflowApv/selectInfModal.html',
        controller: 'SelectInfModalController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              apiHeaderId:vm.wfTemp.apiHeaderId
            };
          }
        }
      }).result.then(function (result) {
          switch(interfaceType){
            case 'list':
              vm.wfTemp.getWfListApiName = result.lineName;
              vm.wfTemp.getWfListApiLineId = result.lineId;
              break;
            case 'detail':
              vm.wfTemp.getWfDetailApiName = result.lineName;
              vm.wfTemp.getWfDetailApiLineId = result.lineId;
              break;
            case 'setStatus':
              vm.wfTemp.setWfStatusApiName = result.lineName;
              vm.wfTemp.setWfStatusApiLineId = result.lineId;
              break;
            case 'userList':
              vm.wfTemp.getUserListApiName = result.lineName;
              vm.wfTemp.getUserListApiLineId = result.lineId;
              break;
          }
        }, function (reason) {
          console.log(reason)
        });
    }

  }
})();
