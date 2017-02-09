(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AnnualMeetingController', AnnualMeetingController);
  AnnualMeetingController.$inject = ['$state','AnnualMeeting','entity','paginationConstants','$localStorage','$sessionStorage','Upload','BaseConfig'];
  /** @ngInject */
  function AnnualMeetingController($state, AnnualMeeting,entity, paginationConstants,$localStorage,$sessionStorage,Upload,BaseConfig) {
    var vm = this;
    vm.meeting=entity;
    vm.meetings=[];
    vm.page = 1;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadSearch=loadSearch;
    vm.update=update;
    vm.loadSearch();

    function loadSearch(){
      var page=vm.page;
      var pageSize=paginationConstants.itemsPerPage;
      AnnualMeeting.meetingLoadSearch(page,pageSize).query(vm.meeting, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.meetings = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function update(){
      AnnualMeeting.meetingLoadSearch().update(vm.meeting, onSuccess, onError);
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadSearch();
    }
  }
})();
