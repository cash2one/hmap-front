(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('LeftnavbarController', LeftnavbarController);

  LeftnavbarController.$inject = ['$timeout', '$localStorage'];

  function LeftnavbarController($timeout, $localStorage) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1466700649301;
  }
})();
