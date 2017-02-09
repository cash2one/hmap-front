(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AnnualMeetingSeatController', AnnualMeetingSeatController);
  AnnualMeetingSeatController.$inject = ['$state','AnnualMeeting','entity','toastr'];
  /** @ngInject */
  function AnnualMeetingSeatController($state, AnnualMeeting,entity,toastr) {
    var vm = this;
    vm.meeting=entity;
    vm.meetings=[];
    vm.loadSeats=loadSeats;
    vm.isBuildTable=false;
    vm.loadSeats(entity.id);
    vm.clear=clear;
    vm.creatTable=creatTable;
    vm.savetable=savetable;
    vm.splitName="";
    vm.hasSplit=false;
    vm.tableState=[
      {code: "Y", name: "可用"},
      {code: "N", name: "禁用"}
    ];
    function loadSeats(id){
      if(id){
        AnnualMeeting.getSeats().query({id: id}, onSuccess, onError);
      }
    }
    function onSuccess(data, headers) {
      vm.meetings = data.rows;
      if(vm.meeting.needSplit=='true'){
        vm.hasSplit=true;
      }
    }
    function onError(error) {
      toastr.error("加载出错！",'信息提示');
    }
    function clear() {
      $state.go('annualMeeting');
    }
    function creatTable() {
      AnnualMeeting.buildTable().save({meetingId: vm.meeting.id,splitName:vm.splitName}, creatSuccess, creatError);
    }
    function creatSuccess(data, headers) {
      toastr.success('创建成功！','信息提示');
      vm.meetings.push(data.rows[0]);
    }
    function creatError(error) {
      toastr.error(error.data.message,'信息提示');
    }
    function savetable(table){
      AnnualMeeting.saveTable().save(table, creatSuccess, onError);
    }
  }
})();
