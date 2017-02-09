(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AnnualMeetingNewController', AnnualMeetingNewController);
  AnnualMeetingNewController.$inject = ['uibDateParser','$timeout','$state','AnnualMeeting','entity','toastr'];
  /** @ngInject */
  function AnnualMeetingNewController(uibDateParser,$timeout,$state, AnnualMeeting,entity,toastr) {
    var vm = this;
    vm.meeting=entity;
    vm.loadMeeting=loadMeeting;
    vm.popupOpen = popupOpen;
    vm.dateOptions = dateOptions;
    vm.save=save;
    vm.creatTables=creatTables;
    vm.isBuildTable=false;
    vm.loadMeeting(entity.id);
    vm.clear=clear;
    vm.arrangementType = [
      {code: "1", name: "蛇形"},
      {code: "0", name: "流水"}
    ];
    vm.addSplit=addSplit;

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });
    function loadMeeting(id){
      if(id){
        AnnualMeeting.getMeeting().query({id: id}, onSuccess, onError);
      }else{
        vm.meeting.hmsAnnualMeeting.id=AnnualMeeting.generateUUID();
      }
    }
    function addSplit(){
      vm.meeting.splitList.push({id:AnnualMeeting.generateUUID(),meetingId:vm.meeting.hmsAnnualMeeting.id,splitName:"",startNum:"",endNum:""})
    }
    function popupOpen() {
      vm.isOpen = true;
    }
    function onSuccess(data, headers) {
      vm.meeting = data.rows[0];
      vm.meeting.hmsAnnualMeeting.meetingDate=uibDateParser.parse(vm.meeting.hmsAnnualMeeting.meetingDate,"yyyy-MM-dd");
      if(vm.meeting.hmsAnnualMeeting.needSplit=="true"){
        vm.meeting.hmsAnnualMeeting.needSplit=true;
      }
      if(vm.meeting.hmsAnnualMeeting.attribute1!="false"){
        vm.meeting.hmsAnnualMeeting.attribute1=true;
      }else{
        vm.meeting.hmsAnnualMeeting.attribute1=false;
      }
    }
    function onError(error) {
      toastr.error("加载出错！",'信息提示');
    }
    function creatTables(){
      AnnualMeeting.buildTables().save(vm.meeting, buildSuccess, buildError);
    }
    function buildSuccess(result){
      toastr.success('生成桌数据！','信息提示');
      vm.isBuildTable=true;
    }
    function buildError(error) {
      toastr.error(error.data.message,'信息提示');
    }
    function save(){
      vm.isSaving = true;
      AnnualMeeting.meetingUpdate().save(vm.meeting, onSaveSuccess, onSaveError);
    }
    function onSaveSuccess(result) {
      toastr.success('保存成功！','信息提示');
      vm.isSaving = true;
    }

    function onSaveError() {
      toastr.error('保存失败！','信息提示');
      vm.isSaving = false;
    }
    function dateOptions() {
      var options = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
      return options;
    }
    function clear(){
      $state.go('annualMeeting');
    }
  }
})();
