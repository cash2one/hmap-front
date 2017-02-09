(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AnnualMeetingShowController', AnnualMeetingShowController);
  AnnualMeetingShowController.$inject = ['$timeout','$state','AnnualMeeting','entity','toastr'];
  /** @ngInject */
  function AnnualMeetingShowController($timeout,$state, AnnualMeeting,entity,toastr) {
    var vm = this;
    vm.meeting=entity;
    vm.loadMeeting=loadMeeting;
    vm.isBuildTable=false;
    vm.loadMeeting(entity.id);
    vm.clear=clear;

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });
    function loadMeeting(id){
      if(id){
        AnnualMeeting.getMeeting().query({id: id}, onSuccess, onError);
      }
    }
    function onSuccess(data, headers) {
      vm.meeting = data.rows[0];
    }
    function onError(error) {
      toastr.error("加载出错！",'信息提示');
    }
    function clear() {
      $state.go('annualMeeting');
    }
  }
})();
