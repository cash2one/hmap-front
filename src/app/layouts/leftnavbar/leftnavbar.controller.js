(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('LeftnavbarController', LeftnavbarController);

  LeftnavbarController.$inject = ['$timeout', '$sessionStorage', '$log', 'Authority'];

  function LeftnavbarController($timeout, $sessionStorage, $log, Authority) {
    var vm = this;
    vm.loadUser = loadUser;
    vm.loadRole = loadRole;
    vm.user = {};
    vm.role = {};
    vm.menu = [];
    vm.loadUser();
    vm.loadRole();

    function loadUser() {
      vm.user.userName = $sessionStorage.user.userName;
    }
    function loadRole() {
      Authority.queryUserRoles().get({userId: $sessionStorage.user.userId}, function (data) {
          $sessionStorage.role = data.rows;
          vm.role.roleName = $sessionStorage.role[0].roleName;
        }
        ,function (error) {
        });
    }


    function onSuccess(data, headers) {
      vm.menu = data.rows;
    }

    function onError(error) {
      //console.log('error');
    }
  }
})();
