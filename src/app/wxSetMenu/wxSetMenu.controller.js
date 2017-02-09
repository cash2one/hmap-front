(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('WxSetMenuController', WxSetMenuController);
  WxSetMenuController.$inject = ['$state','WxSetMenu','entity','paginationConstants','$localStorage','$sessionStorage','Upload','BaseConfig'];
  /** @ngInject */
  function WxSetMenuController($state, WxSetMenu,entity, paginationConstants,$localStorage,$sessionStorage,Upload,BaseConfig) {
    var vm = this;
    vm.menu=entity;
    vm.menus=[];
    vm.page = 1;
    vm.file="";
    vm.totalItems = null;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadSearch=loadSearch;
    vm.update=update;
    vm.setMenu=setMenu;
    vm.loadSearch();

    function loadSearch(){
      var page=vm.page;
      var pageSize=paginationConstants.itemsPerPage;
      WxSetMenu.wxMenuLoadSearch(page,pageSize).query(vm.menu, onSuccess, onError);
    }
    function setMenu(){
      WxSetMenu.wxSetMenu().update(setSuccess, setError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.menus = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function setSuccess(data, headers) {
      console.log('setSuccess');
      console.log(data);
    }
    function setError(error) {
      console.log('error');
    }
    function update(){
      WxSetMenu.wxMenuLoadSearch().update(vm.menu, onSuccess, onError);
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadSearch();
    }

  }
})();
