(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TopnavbarController', TopnavbarController);

  TopnavbarController.$inject = ['$state', 'Auth','$localStorage','$sessionStorage','Hmapfe'];

  function TopnavbarController($state, Auth,$localStorage,$sessionStorage,Hmapfe) {

    var vm = this;
    vm.logout = logout;

    function logout() {
      $localStorage.allTags=undefined;
      $localStorage.deptData=undefined;
      $sessionStorage.user=undefined;
      $sessionStorage.role=undefined;
      Auth.logout();
      $state.go('login');
    }
  }
})();
