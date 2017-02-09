(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AnnualMeetingUserController', AnnualMeetingUserController);
  AnnualMeetingUserController.$inject = ['AnnualMeeting','entity','paginationConstants','toastr'];
  /** @ngInject */
  function AnnualMeetingUserController(AnnualMeeting,entity, paginationConstants,toastr) {
    var vm = this;
    vm.table=entity;
    vm.staffs=[];
    vm.page = 1;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadSearch=loadSearch;
    vm.loadSearch();

    function loadSearch(){
      AnnualMeeting.staffLoadSearch().query(vm.table, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      vm.staffs = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      toastr.error("加载出错！",'信息提示');
    }
    function pageChanged() {
      loadSearch();
    }
  }
})();
