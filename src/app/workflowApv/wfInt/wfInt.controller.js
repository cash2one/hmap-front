/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('WfIntController',WfIntController);

  WfIntController.$inject = ['WfIntService','paginationConstants','entity','DTOptionsBuilder','DTColumnBuilder','$q'];

    function WfIntController(WfIntService,paginationConstants,entity,DTOptionsBuilder,DTColumnBuilder,$q){
      var vm = this;
      vm.wfInt = entity;
      vm.page = 1;
      vm.totalItems = null;
      vm.itemsPerPage = paginationConstants.itemsPerPage;
      vm.wfInt.page = vm.page;
      vm.wfInt.pagesize = paginationConstants.itemsPerPage;

      vm.dtOptions = DTOptionsBuilder
        .newOptions()
        .withOption('searching',false)
        .withFnServerData(serverData)
        .withDataProp('data') //Tried 'data' as well
        .withPaginationType('full_numbers')
        .withBootstrap();

      function serverData(sSource, aoData, fnCallback, oSettings) {
        //All the parameters you need is in the aoData variable
        var draw = aoData[0].value;
        var order = aoData[2].value;
        var start = aoData[3].value;
        var length = aoData[4].value;

        switch(order[0].column)
        {
          case 0:
            order[0].column = "workflowInterfaceId"
            break;
          case 1:
            order[0].column = "workflowId"
            break;
          case 3:
            order[0].column = "workflowErrorCode"
            break;
          case 5:
            order[0].column = "creationDate"
            break;
        }
        var params = {  page:start/length +1,
                        pagesize:length,
                        order:order};

        getWfInts(params).then(
          function(result){
          if (fnCallback){
            var records = {
              'draw': draw,
              'recordsTotal': result.total,
              'recordsFiltered': result.total,
              'data': result.rows
            };
            fnCallback(records);
          }
        }, function (error) {
        });
      };

      vm.dtColumns = [
        DTColumnBuilder.newColumn('workflowInterfaceId').withTitle('接口ID'),
        DTColumnBuilder.newColumn('workflowId').withTitle('工作流ID'),
        DTColumnBuilder.newColumn('workflowJson').withTitle('推送内容'),
        DTColumnBuilder.newColumn('workflowErrorCode').withTitle('推送状态编码'),
        DTColumnBuilder.newColumn('workflowErrorMessage').withTitle('推送状态'),
        DTColumnBuilder.newColumn('creationDate').withTitle('创建时间'),
        DTColumnBuilder.newColumn('lastUpdateDate').withTitle('上次更新时间'),
      ];


    function getWfInts(params){
      var deferred = $q.defer();
       WfIntService.getWfInts().get({
        page: params.page,
        pagesize: params.pagesize,
        order:params.order
      },function(result){
         console.log(result);
           deferred.resolve(result);

       },
         function (error) {
           console.log('error');
           deferred.reject(error);
         });
       return deferred.promise;
    }

      vm.search = function(){
        //每次搜索的时候把page设为 1
        vm.wfInt.page = vm.page = 1;
        vm.wfInt.pagesize = paginationConstants.itemsPerPage;

        getWfInts(vm.wfInt).then(
          function(result){
          }, function (error) {
          });;
      }



    };


})();
