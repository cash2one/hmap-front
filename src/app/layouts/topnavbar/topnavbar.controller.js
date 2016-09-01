(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TopnavbarController', TopnavbarController);

  TopnavbarController.$inject = ['$state', 'Auth'];

  function TopnavbarController($state, Auth) {

    var vm = this;
    vm.logout = logout;

    function logout() {
      Auth.logout();
      $state.go('login');
    }
  }
})();
