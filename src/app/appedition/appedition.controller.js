(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppeditionController', AppeditionController);
  AppeditionController.$inject = ['$scope','$state','Appedition','paginationConstants'];
  /** @ngInject */
  function AppeditionController( $scope,$state, Appedition, paginationConstants) {
    var vm = this;
    $scope.num=0;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.loadAll();

    function loadAll() {
      Appedition.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.appeditions = data.rows;
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
