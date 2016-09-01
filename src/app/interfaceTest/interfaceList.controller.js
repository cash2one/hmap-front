/**
 * Created by user on 2016/8/16.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('InterfaceListController', InterfaceListController);

  InterfaceListController.$inject = ['InterfaceListService', '$state','paginationConstants'];

  function InterfaceListController(InterfaceListService, $state,paginationConstants) {
    var vm = this;

    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    var page = vm.page;
    var pageSize = paginationConstants.itemsPerPage;
    findHeaderAndLine(page,pageSize);


    function findHeaderAndLine(page,pageSize) {
      return InterfaceListService.findHeaderAndLine(page,pageSize)
        .then(function (data) {
          vm.result = data.rows;
          vm.totalItems =  data.total;
          console.log("result00000"+angular.toJson(data));

        });

    }

    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      findHeaderAndLine(vm.page,pageSize);
    };


  }


})();
