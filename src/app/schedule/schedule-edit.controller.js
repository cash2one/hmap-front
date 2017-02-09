(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ScheduleEditController', ScheduleEditController);

  ScheduleEditController.$inject = ['$timeout','$scope','$state', '$stateParams','Schedule','entity','uibDateParser'];

  function ScheduleEditController($timeout,$scope, $state, $stateParams, Schedule, entity, uibDateParser) {
    var vm = this;

    vm.schedule = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.sendTime = sendTime;
    vm.load=load;

    vm.load(vm.schedule.id);

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

    function load(id) {
      vm.schedule.id=id;
      Schedule.scheduleLoadSearch(1,1).query(vm.schedule, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.schedule = data.rows[0];
      vm.schedule.sendTime=uibDateParser.parse(vm.schedule.sendTime,"yyyy-MM-dd");
    }
    function onError(error) {
      console.log('error');
    }
  }
})();
