/**
 * Created by user on 2016/8/3.
 */
(function (){
  'use strict';

  angular.module('hmapFront')
    .controller('HeaderController',HeaderController);

  HeaderController.$inject = ['HeaderService','$state','$scope','paginationConstants','entity'];

  function HeaderController(HeaderService,$state,$scope,paginationConstants,entity){
      var vm = this;
    vm.header = entity;

    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    //var page = vm.page;
    //var pageSize = paginationConstants.itemsPerPage;
    vm.header.page = vm.page;
    vm.header.pagesize = paginationConstants.itemsPerPage;

    getAllHeader(vm.header);

    function getAllHeader(header){
      return HeaderService.getHeaders(header)
        .then(function(data){
          vm.headerAll = data.rows;
          vm.totalItems =  data.total;
          console.log("===="+angular.toJson(vm.headerAll));
          //return  vm.headerAll;
        });

    }

    vm.search = function(){
      //每次搜索的时候把page设为 1
      vm.header.page = vm.page = 1;
      vm.header.pagesize = paginationConstants.itemsPerPage;

      if(vm.header.interfaceCode!=null && vm.header.interfaceCode === ""){
        vm.header.interfaceCode = undefined;
      }
      if(vm.header.headerName!=null && vm.header.headerName === ""){
        vm.header.headerName = undefined;
      }
      getAllHeader( vm.header);
    }


    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      vm.header.page = vm.page;
      vm.header.pagesize = paginationConstants.itemsPerPage;
      getAllHeader(vm.header);
    };


    $scope.editHeader = function(header){
      $state.go("editHeader",{header:header});
    };

    $scope.addHeader = function(){
      $state.go("addHeader");
    }



  }


})();
