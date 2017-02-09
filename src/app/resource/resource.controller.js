/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ResourceController', ResourceController);

  ResourceController.$inject = ['Resource','paginationConstants','$timeout', '$localStorage'];

  function ResourceController(Resource,paginationConstants,$timeout, $localStorage) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.loadByName=loadByName;
    vm.transition = transition;
    vm.searchResource=[];
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.loadAll();


    function loadAll () {
      Resource.query().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function loadByName(){
      vm.searchResource.page=vm.page;
      vm.searchResource.pagesize=paginationConstants.itemsPerPage;
      Resource.query().query(vm.searchResource,onSuccess,onError);
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.resources = data.rows;
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
