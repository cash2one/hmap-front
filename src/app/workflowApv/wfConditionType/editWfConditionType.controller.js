/**
 * Created by xinming on 2016/9/2.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('EditWfConditionTypeController', EditWfConditionTypeController);

  EditWfConditionTypeController.$inject = [ '$state', '$uibModal', '$log','WfSourceService', 'entity', 'paginationConstants','WfConditionTypeService'];

  function EditWfConditionTypeController( $state, $uibModal, $log, WfSourceService,entity, paginationConstants,WfConditionTypeService) {
    var vm = this;
    vm.wfConditionType = entity;
    //来源系统ID和名称

    vm.sourceId = vm.wfConditionType.sourceId;

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
      if (vm.wfConditionType.id != undefined && vm.wfConditionType.id != null && vm.wfConditionType.id != '') {
        vm.editOrCreate='edit';
        WfConditionTypeService.get().get(vm.wfConditionType, function (result) {
          vm.wfConditionType = result.rows[0];
        });
      }else{
        getWfSource(vm.sourceId);
      }
    }

    function getWfSource(id){
      WfSourceService.get().get({
        id:id
      }, function(data){
        vm.wfConditionType.apiHeaderId = data.rows[0].apiHeaderId;
        vm.wfConditionType.apiHeaderName = data.rows[0].apiHeaderName;
        vm.wfConditionType.getWfListApiName = data.rows[0].getWfListApiName;
      }, function(){
        console.log('error');
      });
    }

    function isNotDelete(resource) {
      return resource.__status != "delete";
    }

    function saveOrUpdate() {
      if (vm.editOrCreate=='create'){
        vm.wfConditionType.id = null;
        WfConditionTypeService.create().save(vm.wfConditionType, onSuccess, onError);
      }
      else if (vm.editOrCreate=='edit'){
        WfConditionTypeService.edit().save(vm.wfConditionType, onSuccess, onError);
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
    function goSelectLine(){
      $uibModal.open({
        templateUrl: 'app/workflowApv/selectInfModal.html',
        controller: 'SelectInfModalController',
        controllerAs: 'vm',
        backdrop: 'static',
        size: 'lg',
        resolve: {
          entity: function () {
            return {
              apiHeaderId:vm.wfConditionType.apiHeaderId
            };
          }
        }
      }).result.then(function (result) {
          vm.wfConditionType.getWfConditionApiName = result.lineName;
          vm.wfConditionType.getWfConditionApiLineId = result.lineId;
        }, function (reason) {
          console.log(reason)
        });
    }
  }
})();
