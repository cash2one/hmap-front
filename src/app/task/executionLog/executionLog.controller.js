(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ExecutionLogController', ExecutionLogController);
  ExecutionLogController.$inject = ['$state','ExecutionLog','entity','paginationConstants'];
  /** @ngInject */
  function ExecutionLogController($state, ExecutionLog,entity, paginationConstants) {
    var vm = this;
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
      var page=vm.page;
      var pagesize=paginationConstants.itemsPerPage;
      ExecutionLog.loadAll(page,pagesize).query({}, onSuccess, onError);
    }
    function loadJobs() {
      var page = vm.page;
      var pagesize = paginationConstants.itemsPerPage;
      ExecutionLog.loadAll(page, pagesize).query(vm.job, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.jobs = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      //console.log('error');

    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' +vm.page);
      loadAll();
    }
  }
})();
