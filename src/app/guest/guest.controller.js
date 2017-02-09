(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('GuestController', GuestController);
  GuestController.$inject = ['$state','Guest','entity','paginationConstants','$localStorage','$sessionStorage','Upload','BaseConfig'];
  /** @ngInject */
  function GuestController($state, Guest,entity, paginationConstants,$localStorage,$sessionStorage,Upload,BaseConfig) {
    var vm = this;
    vm.guest=entity;
    vm.guests=[];
    vm.page = 1;
    vm.file="";
    vm.importExcel=importExcel;
    vm.totalItems = null;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadSearch=loadSearch;
    vm.fishUpload=fishUpload;
    vm.exportExcel=exportExcel;
    vm.update=update;
    vm.sign=sign;
    vm.pass=pass;
    vm.loadSearch();

    function loadSearch(){
      var page=vm.page;
      var pageSize=paginationConstants.itemsPerPage;
      Guest.guestLoadSearch(page,pageSize).query(vm.guest, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.guests = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function update(){
      Guest.guestLoadSearch().update(vm.guest, onSuccess, onError);
    }
    function sign(guest){
      guest.sign="Y";
      Guest.guestUpdate().update(guest);
      loadSearch();
    }
    function pass(guest){
      guest.passState="Y";
      Guest.guestUpdate().update(guest);
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadSearch();
    }
    function importExcel(obj) {
      document.getElementById(obj).click();
    }
    function fishUpload() {
      Guest.guestImport(vm.file);
    }
    function exportExcel() {
      Guest.guestExport(vm.guest);
    }
  }
})();
