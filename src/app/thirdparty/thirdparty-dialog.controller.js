/**
 * Created by zhouzy on 2016/7/31 0031.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ThirdpartyDialogController', ThirdpartyDialogController);

  ThirdpartyDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Thirdparty','toastr'];

  function ThirdpartyDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Thirdparty,toastr) {
    var vm = this;

    vm.thirdparty = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.popupOpen = popupOpen;
    vm.load=load;

    vm.load(vm.thirdparty.id);

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      if (vm.thirdparty.id !== null) {
        Thirdparty.update(vm.thirdparty, onSaveSuccess, onSaveError);
      } else {
        Thirdparty.save(vm.thirdparty, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:thirdpartyUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = false;
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
        //console.log('loadone');
        Thirdparty.get({id: id}, function (result) {
          vm.thirdparty = result.rows[0];
        });
      }

    }

  }
})();
