/**
 * Created by zhouzy on 2016/8/18 0018.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('SysConfigController', SysConfigController);

  SysConfigController.$inject = ['$state', 'SysConfig', 'paginationConstants'];

  function SysConfigController($state, SysConfig, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.searchConfig = {};
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.search = search;
    vm.value = '';
    vm.loadAll();

    function loadAll() {
      SysConfig.query().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function search() {
      vm.searchConfig.page = vm.page;
      vm.searchConfig.pagesize = paginationConstants.itemsPerPage;
      SysConfig.query().query(vm.searchConfig, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.sysConfigs = data.rows;
      vm.totalItems = data.total;
    }

    function onError(error) {
      //console.log('error');

    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      loadAll();
    };
  }


})();
