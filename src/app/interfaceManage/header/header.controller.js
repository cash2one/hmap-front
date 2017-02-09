/**
 * Created by user on 2016/8/3.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['HeaderService', '$state', 'paginationConstants', 'entity'];

  function HeaderController(HeaderService, $state, paginationConstants, entity) {
    var vm = this;
    vm.header = entity;

    vm.page = 1;
    vm.totalItems = null;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.header.page = vm.page;
    vm.header.pagesize = vm.itemsPerPage;
    vm.authTypes = [
      {value: "BASIC_AUTH", description: "BasicAuth验证"},
      {value: "OAUTH2", description: "OAuth2.0验证"},
      {value: "NO_AUTH", description: "无验证"}
    ];

    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.search = search;
    vm.reset = reset;
    vm.loadAll=loadAll;

    vm.loadAll();


    function loadAll() {
      //console.log("00000:" + angular.toJson(vm.header));
      //selectSystemType();
      HeaderService.queryAll().query(vm.header, onSuccess, onError)
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(angular.toJson(data));
      vm.headerAll = data.rows;
      vm.totalItems = data.total;
    }

    function onError(error) {
      //console.log('error');
    }

    function search() {
      //每次搜索的时候把page设为 1
      vm.header.page = vm.page = 1;
      vm.header.pagesize = vm.itemsPerPage;

      if (vm.header.interfaceCode != null && vm.header.interfaceCode === "") {
        vm.header.interfaceCode = undefined;
      }
      if (vm.header.name != null && vm.header.name === "") {
        vm.header.name = undefined;
      }
      loadAll();
    };

    function reset() {
      vm.header.name = undefined;
      vm.header.interfaceCode = undefined;
    }


    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      //console.log('Page changed to: ' + vm.page);
      vm.header.page = vm.page;
      vm.header.pagesize = vm.itemsPerPage;
      loadAll();
    };
  }


})();
