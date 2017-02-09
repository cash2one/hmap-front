/**
 * Created by Administrator on 2016/9/2.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ProfileDialogController', ProfileDialogController);

  ProfileDialogController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity', 'Profile'];

  function ProfileDialogController($timeout, $scope, $stateParams, $uibModalInstance, entity, Profile) {
    var vm = this;

    vm.profile = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.popupOpen = popupOpen;
    vm.load=load;

    vm.load(vm.profile.id);

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      //console.log(vm.profile);
      if (vm.profile.id !== null) {
        Profile.update(vm.profile, onSaveSuccess, onSaveError);
      } else {
        Profile.save(vm.profile, onSaveSuccess, onSaveError);
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
        Profile.query({
          page: 1,
          pagesize: 10
        }, function (result) {
          vm.profile = result.rows[0]});
      }

    }

  }
})();
