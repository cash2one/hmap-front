(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('RemindEditController', RemindEditController);

  RemindEditController.$inject = ['$timeout','$scope','$state', '$stateParams','Remind','entity','uibDateParser'];

  function RemindEditController($timeout,$scope, $state, $stateParams, Remind, entity, uibDateParser) {
    var vm = this;

    vm.remind = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.sendTime = sendTime;
    vm.load=load;

    vm.load(vm.remind.id);

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
      $state.go('remind');
    }

    function save() {
      vm.isSaving = true;
      if (vm.remind.id !== null) {
        Remind.update(vm.remind, onSaveSuccess, onSaveError);
      } else {
        Remind.save(vm.remind, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:remindUpdate', result);
      vm.isSaving = true;
      $state.go('remind');
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
      vm.remind.id=id;
      Remind.remindLoadSearch(1,1).query(vm.remind, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.remind = data.rows[0];
      vm.remind.sendTime=uibDateParser.parse(vm.remind.sendTime,"yyyy-MM-dd");
    }
    function onError(error) {
      console.log('error');
    }
  }
})();
