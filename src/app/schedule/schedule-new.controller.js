(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ScheduleNewController', ScheduleNewController);

  ScheduleNewController.$inject = ['$timeout','$scope','$state', '$stateParams','Schedule','entity','uibDateParser'];

  function ScheduleNewController($timeout,$scope, $state, $stateParams, Schedule, entity, uibDateParser) {
    var vm = this;
    vm.schedule = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.sendTime = sendTime;

    vm.target = [
      {id:'all',name:'all'},
      {id:'hand',name:'hand'},
      {id:'join',name:'join'},
      {id:'pic',name:'pic'},
      {id:'park',name:'park'}
    ];
    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });
    function clear() {
      $state.go('schedule');
    }
    function save() {
      vm.isSaving = true;
      if (vm.schedule.id !== null) {
        Schedule.update(vm.schedule, onSaveSuccess, onSaveError);
      } else {
        Schedule.save(vm.schedule, onSaveSuccess, onSaveError);
      }
    }
    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:scheduleUpdate', result);
      vm.isSaving = true;
      $state.go('schedule');
    }
    function onSaveError() {
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
    function sendTime() {
      vm.isSendTime = true;
    }
  }
})();
