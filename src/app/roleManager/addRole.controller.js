/**
 * Created by xincai.zhang on 2016/8/12.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddRoleController', AddRoleController);

  AddRoleController.$inject = ['RoleService', '$scope', '$state', '$uibModalInstance'];

  function AddRoleController(RoleService, $scope, $state, $uibModalInstance) {
    var vm = this;
    vm.role = null;
    vm.clear = clear;
    vm.add = add;

    function add() {
      console.log("role:" + angular.toJson(vm.role));
      return RoleService.addRole(vm.role)
        .then(function (data) {
          console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            return $state.go('rolemanager', null, {reload: true});
          }

        });

    };


    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
