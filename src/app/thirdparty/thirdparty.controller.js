(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ThirdpartyController', ThirdpartyController);

  ThirdpartyController.$inject = ['$state','Thirdparty','paginationConstants'];

  function ThirdpartyController($state,Thirdparty,paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.loadAll();

    function loadAll () {
      Thirdparty.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.thirdpartys = data.rows;
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
