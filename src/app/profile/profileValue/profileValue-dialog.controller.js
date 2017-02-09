/**
 * Created by Administrator on 2016/9/5.
 */

(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ProfileValueDialogController', ProfileValueDialogController);

  ProfileValueDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'ProfileValue'];

  function ProfileValueDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, ProfileValue) {
    var vm = this;

    vm.profileValue = entity;
    vm.clear = clear;
    vm.save = save;
    vm.loadValue = loadValue;
    vm.dateOptions = dateOptions;
    vm.popupOpen = popupOpen;
    vm.load=load;
    vm.profileValue.levelId = $scope;

    //console.log(vm.profileValue.profileId);

    vm.load(vm.profileValue.id);

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      if (vm.profileValue.id !== null) {
        ProfileValue.update(vm.profileValue, onSaveSuccess, onSaveError);
      } else {
        ProfileValue.save(vm.profileValue, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:profileUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = false;
    }

    function onSaveError() {
      vm.isSaving = false;
    }

    function loadValue() {
      ProfileValue.query({
        levelId:vm.profileValue.levelId
      }, function (result) {
        vm.levels = result.rows[0][1]
          //console.log(vm.levels);
        //console.log(result);
      });
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
        //console.log(id);
        ProfileValue.query({
          profileValueId:id
        }, function (result) {
          vm.profileValue = result.rows[0][0][0],
          //console.log(vm.profileValue.levelId);
          ProfileValue.query({
            levelId:vm.profileValue.levelId
          }, function (result) {
            vm.levels = result.rows[0][1]
            //console.log(vm.levels);
            //console.log(result);
            //console.log(vm.profileValue.levelName);
          });

        });
      }

    }

  }
})();
