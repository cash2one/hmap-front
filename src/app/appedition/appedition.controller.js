(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppEditionController', AppEditionController);
  AppEditionController.$inject = ['$state','AppEdition','paginationConstants'];
  /** @ngInject */
  function AppEditionController($state, AppEdition, paginationConstants) {
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.loadAll();

    function loadAll() {
      AppEdition.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      ////console.log('onSuccess');
      ////console.log(data);
      vm.appEditions = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      ////console.log('error');

    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      ////console.log('Page changed to: ' +vm.page);
      loadAll();
    };
  }
})();
