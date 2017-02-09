(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('UserController', UserController);
  UserController.$inject = ['$state','User','paginationConstants'];
  /** @ngInject */
  function UserController($state, User, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.loadByName = loadByName;
    vm.queryByName = queryByName;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.foundByName="";
    vm.loadByName();

    function loadByName(){
      User.get({
        id:vm.foundByName
      }, onSuccess, onError);
    }
    function queryByName(){
      if(vm.foundByName==""){
        vm.loadByName();
      }else {
        User.getByName({
          name: vm.foundByName
        }, onSuccess, onError);
      }
    }
    function loadAll() {
      User.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.users = data.rows;
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
    };
  }
})();
