(function () {
  'use strict';

  angular.module("hmapFront").controller("MessageTemplateController", MessageTemplateController);

  MessageTemplateController.$inject = ['$state','paginationConstants','MessageTemplateService'];

  function MessageTemplateController($state,paginationConstants,MessageTemplateService){
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.template={};
    vm.template.page = vm.page;
    vm.template.pagesize = vm.itemsPerPage;

    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.search = search;
    vm.reset = reset;
    vm.loadAll=loadAll;

    vm.loadAll();


    function loadAll() {
      MessageTemplateService.queryAll().query(vm.template, onSuccess, onError)
    }

    function onSuccess(data, headers) {
      vm.templates = data.rows;
      vm.totalItems = data.total;
    }

    function onError(error) {
    }

    function search() {
      //每次搜索的时候把page设为 1
      vm.template.page = vm.page = 1;
      vm.template.pagesize = vm.itemsPerPage;

      loadAll();
    };

    function reset() {
/*      vm.template.name = undefined;
      vm.template.interfaceCode = undefined;*/
    }


    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      vm.template.page = vm.page;
      vm.template.pagesize = vm.itemsPerPage;
      loadAll();
    };
  }
})();
