/**
 * Created by xincai.zhang on 2016/8/12.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('RoleManagerController', RoleManagerController);

  RoleManagerController.$inject = ['RoleService', '$scope', '$state'];

  function RoleManagerController(RoleService, $scope, $state) {
    var vm = this;
    vm.role = null;
    var role = vm.role;
    getRoles(role);

    function getRoles(role) {
      return RoleService.findRoles(role)
        .then(function (data) {
          vm.result = data.rows;
          console.log("result00000" + angular.toJson(vm.result));
        })

    }

    vm.vm = {
      role: {
        "roleCode":null,
        "roleName":null,
        "roleDescription":null
      }
    };
    vm.queryRole = function () {
      var role = vm.vm.role;
      getRoles(role);
      function getRoles(role) {
        return RoleService.findRoles(role)
          .then(function (data) {
            vm.result = data.rows;
            //console.log("result00000" + angular.toJson(vm.result));
          })

      }
    }
    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};


  }


})();
