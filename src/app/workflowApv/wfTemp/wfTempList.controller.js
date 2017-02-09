/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('WfTempController',WfTempController);
    /** @ngInject */
    function WfTempController(WfSourceService,WfTempService,WfConditionTypeService,$state,$scope,paginationConstants,entity){
      var vm = this;
      vm.wfTemp = entity;
      vm.wfConditionType = {}
      vm.page = 1;
      vm.conditionPage = 1;
      vm.totalItems = null;
      vm.transition = transition;
      vm.pageChanged=pageChanged;
      vm.conditionPageChanged=conditionPageChanged;
      vm.itemsPerPage = paginationConstants.itemsPerPage;
      vm.wfTemp.page = vm.page;
      vm.wfConditionType.page =  vm.conditionPage;

      vm.wfTemp.pagesize = paginationConstants.itemsPerPage;
      vm.wfConditionType.pagesize =  paginationConstants.itemsPerPage;

      getWfSource(vm.wfTemp.sourceId);

    function getWfSource(id){
      WfSourceService.get().get({
        id:id
      }, function(data){
        //alert(11111)
        vm.wfTemp.apiHeaderId = data.rows[0].apiHeaderId;
        vm.wfTemp.apiHeaderName = data.rows[0].apiHeaderName;
        vm.wfTemp.getWfListApiName = data.rows[0].getWfListApiName;
        getWfTemps(vm.wfTemp);
        vm.wfConditionType.apiHeaderId = data.rows[0].apiHeaderId;
        getWfConditionTypes(vm.wfConditionType);
      }, function(){
        console.log('error');
      });
    }
      //获取模板
    function getWfTemps(wfTemp){
      WfTempService.getWfTemps().get({
        apiHeaderId:wfTemp.apiHeaderId,
        templateCode:wfTemp.templateCode,
        workflowName:wfTemp.workflowName,
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, function (data, headers) {
        vm.wfTempAll = data.rows;
        vm.totalItems =  data.total;
      }, function (error) {
        console.log('error');
      });
    }

  //获取查询条件
      function getWfConditionTypes(wfConditionType){
        WfConditionTypeService.getWfConditionTypes().get({
          apiHeaderId:wfConditionType.apiHeaderId,
          conditionTypeCode:wfConditionType.conditionTypeCode,
          conditionTypeName:wfConditionType.conditionTypeName,
          page: vm.conditionPage,
          pagesize: paginationConstants.itemsPerPage
        }, function (data, headers) {
          vm.wfConditionTypeAll = data.rows;
          vm.totalConditionItems =  data.total;
        }, function (error) {
          console.log('error');
        });
      }

      vm.search = function(){
        //每次搜索的时候把page设为 1
        vm.wfTemp.page = vm.page = 1;
        vm.wfTemp.pagesize = paginationConstants.itemsPerPage;

        getWfTemps(vm.wfTemp);
      }
      vm.searchConditionType = function(){
        //每次搜索的时候把page设为 1
        vm.wfConditionType.page = vm.conditionPage = 1;
        vm.wfConditionType.pagesize = paginationConstants.itemsPerPage;

        getWfConditionTypes(vm.wfConditionType);
      }

      vm.delete = function(id){
        WfTempService.delete().delete({id:id},
          function(data){
            getWfTemps(vm.wfTemp);
        },
        function(error){
          console.log('error');
        })
      }
      vm.editConditionType = function (id){
        $state.go('wfTemp.wfConditionTypeEdit',{id:id,sourceId:vm.wfTemp.sourceId});
      }
      vm.deleteConditionType = function(id){
        WfConditionTypeService.delete().delete({id:id},
          function(data){
            getWfConditionTypes(vm.wfConditionType);
          },
          function(error){
            console.log('error');
          })
      }

      function transition () {
        $state.transitionTo($state.$current, {
          page: vm.page
        });
      }

      function pageChanged() {
        console.log('Page changed to: ' +vm.page);
        vm.wfTemp.page = vm.page;
        vm.wfTemp.pagesize = paginationConstants.itemsPerPage;
        getWfTemps(vm.wfTemp);
      };

      function conditionPageChanged() {
        vm.wfConditionType.page = vm.conditionPage;
        vm.wfConditionType.pagesize = paginationConstants.itemsPerPage;
        getWfConditionTypes(vm.wfConditionType);
      };

      $scope.addHeader = function(){
        $state.go("addHeader");
      }
    };



})();
