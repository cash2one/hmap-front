/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('WecorpAgentListController',['WecorpAgentListService','$state','$scope','paginationConstants','entity',
    function(WecorpAgentListService,$state,$scope,paginationConstants,entity){
      var vm = this;
      vm.wecorpAgentList = entity;
      getAgentList(vm.wecorpAgentList);
      function getAgentList(wecorpAgentList){
        WecorpAgentListService.getAgentList().get({
          apiHeaderName:wecorpAgentList.apiHeaderName
        }, onSuccess, onError);
      } function onSuccess(data, headers) {
        vm.agentList = data.rows;
      }
      function onError(error) {
        console.log('error');
      }
    }]);
})();
