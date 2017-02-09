(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('RemindController', RemindController);
  RemindController.$inject = ['$state','Remind','entity','paginationConstants','$localStorage','$sessionStorage','Upload','BaseConfig'];
  /** @ngInject */
  function RemindController($state, Remind,entity, paginationConstants,$localStorage,$sessionStorage,Upload,BaseConfig) {
    var vm = this;
    vm.remind=entity;
    vm.reminds=[];
    vm.page = 1;
    vm.file="";
    vm.totalItems = null;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadSearch=loadSearch;
    vm.update=update;
    vm.loadSearch();

    function loadSearch(){
      var page=vm.page;
      var pageSize=paginationConstants.itemsPerPage;
      Remind.remindLoadSearch(page,pageSize).query(vm.remind, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.reminds = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function update(){
      Remind.remindLoadSearch().update(vm.remind, onSuccess, onError);
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadSearch();
    }
  }
})();
