(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ExecutionLogController', ExecutionLogController);
  ExecutionLogController.$inject = ['$scope','$state','ExecutionLog','entity','paginationConstants'];
  /** @ngInject */
  function ExecutionLogController( $scope,$state, ExecutionLog,entity, paginationConstants) {
    var vm = this;
    $scope.num=0;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.job = entity;
    vm.loadJobs=loadJobs;
    vm.loadAll();

    function loadAll() {
      ExecutionLog.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function loadJobs(){
      vm.job.page=vm.page;
      vm.job.pagesize=vm.pagesize;
      ExecutionLog.query(
        vm.job , onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.jobs = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');

    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadAll();
    };
  }
})();
