/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('FunctionController', FunctionController);

  FunctionController.$inject = ['Function','paginationConstants','$timeout', '$localStorage','$state'];

  function FunctionController(Function,paginationConstants,$timeout, $localStorage,$state) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.functions=[];
    vm.loadAll = loadAll;
    vm.functionSearch=[];
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadByName = loadByName;
    vm.loadAll();

    function loadAll () {
      Function.query().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function loadByName(){
        vm.functionSearch.page=vm.page;
        vm.functionSearch.pagesize=paginationConstants.itemsPerPage;
          Function.query().query(vm.functionSearch,onSuccess,onError);
    }
    function onSuccess(data, headers) {
      vm.functions = data.rows;
      vm.totalItems =  data.total;
      //console.log(vm.functions);
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
    };
  }
})();
