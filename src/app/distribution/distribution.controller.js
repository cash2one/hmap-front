(function () {
  'use strict';

  angular.module("hmapFront").controller("DistributionController", DistributionController);

  DistributionController.$inject = ['$state', 'DistributionService','entity', 'paginationConstants'];

  function DistributionController($state, DistributionService,entity, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.searchApp = entity;

    vm.loadAll(vm.searchApp,vm.page,vm.itemsPerPage);

    vm.staff = [{"code":"Android","description":"Android"},{"code":"IOS","description":"IOS"}];

    function loadAll(searchApp,page,pageSize) {
      return DistributionService.queryApps(page,pageSize).query(searchApp,onSearchSuccess, onError);
    }

    function onSearchSuccess(data) {
      console.log('onSuccess');
      console.log(data);
      vm.apps = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }

    vm.search = function(){
      vm.page = 1;
      vm.itemsPerPage = paginationConstants.itemsPerPage;
      console.log("appName:" + vm.searchApp.appName);
      loadAll(vm.searchApp,vm.page,vm.itemsPerPage);
    };

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' + vm.page);
      loadAll(vm.searchApp,vm.page,vm.itemsPerPage);
    }

    vm.clear = function () {
      vm.searchApp.appName = null;
      vm.searchApp.appTerrace = null;
    }
  }
})();
