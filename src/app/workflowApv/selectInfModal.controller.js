/**
 * Created by xinming on 2016/9/6.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .controller('SelectInfModalController', SelectInfModalController);

  SelectInfModalController.$inject = [ '$uibModalInstance', 'entity', 'LineService','paginationConstants'];
  function SelectInfModalController($uibModalInstance,entity,LineService,paginationConstants){
    var vm = this;
    vm.page = 1;
    vm.line = entity;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.selectedLines = {};
    vm.clear = clear;
    vm.save = save;

    vm.loadAll();

    function loadAll() {
      if (vm.line.apiHeaderId) {
        LineService.getLines({
          headerId: vm.line.apiHeaderId,
          page: vm.page,
          pagesize: paginationConstants.itemsPerPage
        }).then(
          function (data) {
            vm.lines = data.rows;
            vm.totalItems =  data.total;
          }
      );
      }

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
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      $uibModalInstance.close(vm.selectedLines);
    }
  }
})();
