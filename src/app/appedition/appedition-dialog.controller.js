/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppeditionDialogController', AppeditionDialogController);

  AppeditionDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','Appedition'];

  function AppeditionDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Appedition) {
    var vm = this;

    vm.appedition = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.popupOpen = popupOpen;
    vm.load=load;

    vm.load(vm.appedition.id);

    $scope.Equipments = [
      {id:'iOS',name:'iOS'},
      {id:'Android',name:'Android'},
      {id:'Windows Phone',name:'Windows Phone'}
    ];
    $scope.state = [
      {id:'Y',name:'是'},
      {id:'N',name:'否'}
    ];

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      if (vm.appedition.id !== null) {
        Appedition.update(vm.appedition, onSaveSuccess, onSaveError);
      } else {
        Appedition.save(vm.appedition, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:appeditionUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = true;
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

    function popupOpen() {
      vm.isOpen = true;
    }



    function load(id) {
      if (id) {
        console.log('loadone');
        Appedition.get({id: id}, function (result) {
          vm.appedition = result.rows[0];
        });
      }
    }
  }
})();
