(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ScheduleController', ScheduleController);
  ScheduleController.$inject = ['$state','Schedule','entity','paginationConstants','$localStorage','$sessionStorage','Upload','BaseConfig'];
  /** @ngInject */
  function ScheduleController($state, Schedule,entity, paginationConstants,$localStorage,$sessionStorage,Upload,BaseConfig) {
    var vm = this;
    vm.schedule=entity;
    vm.schedules=[];
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
      Schedule.scheduleLoadSearch(page,pageSize).query(vm.schedule, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.schedules = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function update(){
      Schedule.scheduleLoadSearch().update(vm.schedule, onSuccess, onError);
    }
    function sign(schedule){
      Schedule.sign="Y";
      Schedule.scheduleUpdate().update(schedule);
      loadSearch();
    }
    function pass(schedule){
      Schedule.passState="Y";
      Schedule.scheduleUpdate().update(schedule);
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadSearch();
    }
    function importExcel(obj) {
      document.getElementById(obj).click();
    }
    function fishUpload() {
      Schedule.scheduleImport(vm.file);
    }
    function exportExcel() {
      Schedule.scheduleExport(vm.schedule);
    }
  }
})();
