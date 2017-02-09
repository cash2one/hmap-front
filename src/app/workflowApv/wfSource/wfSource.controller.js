/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('WfSourceController',['WfSourceService','$state','$scope','paginationConstants','entity',
    function(WfSourceService,$state,$scope,paginationConstants,entity){
      var vm = this;
      vm.wfSource = entity;

      vm.page = 1;
      vm.totalItems = null;
      vm.transition = transition;
      vm.pageChanged=pageChanged;
      vm.itemsPerPage = paginationConstants.itemsPerPage;

      //var page = vm.page;
      //var pageSize = paginationConstants.itemsPerPage;
      vm.wfSource.page = vm.page;
      vm.wfSource.pagesize = paginationConstants.itemsPerPage;


      getWfSources(vm.wfSource);

    function getWfSources(wfSource){
      WfSourceService.getWfSources().get({
        apiHeaderName:wfSource.apiHeaderName,
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    } function onSuccess(data, headers) {
        vm.wfSourceAll = data.rows;
        vm.totalItems =  data.total;
      }
      function onError(error) {
        console.log('error');
      }

      vm.search = function(){
        //每次搜索的时候把page设为 1
        vm.wfSource.page = vm.page = 1;
        vm.wfSource.pagesize = paginationConstants.itemsPerPage;

        getWfSources(vm.wfSource);
      }
      vm.delete = function(id){
        WfSourceService.delete().delete({id:id},
          function(data){
            getWfSources(vm.wfSource);
          },
          function(error){
           console.log(error);
          })
      }

      function transition () {
        $state.transitionTo($state.$current, {
          page: vm.page
        });
      }

      function pageChanged() {
        console.log('Page changed to: ' +vm.page);
        vm.wfSource.page = vm.page;
        vm.wfSource.pagesize = paginationConstants.itemsPerPage;
        getWfSources(vm.wfSource);
      };

      $scope.addHeader = function(){
        $state.go("addHeader");
      }
    }]);


})();
