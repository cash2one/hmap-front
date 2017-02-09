/**
 * Created by user on 2016/8/9.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('CodingController', CodingController);

  CodingController.$inject = ['CodingService', '$state', 'paginationConstants'];

  function CodingController(CodingService, $state, paginationConstants) {
    var vm = this;

    vm.page = 1;
    vm.totalItems = null;
    vm.itemsPerPage = paginationConstants.itemsPerPage;

    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.search = search;
    vm.reset = reset;
    vm.delete = deleteCode;

    vm.code = null;
    var page = vm.page;
    var pagesize = paginationConstants.itemsPerPage;


    loadAll(vm.code, page, pagesize);


    function loadAll(code, page, pagesize) {
      return CodingService.findCodes(code, page, pagesize)
        .then(function (data) {
          vm.result = data.rows;
          vm.totalItems = data.total;
          //console.log("result00000" + angular.toJson(vm.result));
        })

    }

    function search() {
      var page = vm.page = 1;
      var pagesize = paginationConstants.itemsPerPage;
      if (vm.code.code === null || vm.code.code === "") {
        vm.code.code = undefined;
      }
      if (vm.code.description === null || vm.code.description === "") {
        vm.code.description = undefined;
      }
      loadAll(vm.code, page, pagesize);
    };

    function reset() {
      vm.code.code = undefined;
      vm.code.description = undefined;
    };

    function deleteCode(code) {
      return CodingService.deleteCode(code)
        .then(function (data) {
          var flag = data.success;
          //console.log("delete result:" + angular.toJson(flag));
          if (flag) {
            return $state.go('coding', null, {reload: true});
          }
        })
    };


    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);

      loadAll(vm.code, vm.page, paginationConstants.itemsPerPage);
    };

  }


})();
