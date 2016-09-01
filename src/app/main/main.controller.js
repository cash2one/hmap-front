(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('MainController', MainController);

  MainController.$inject = ['$timeout', '$localStorage'];

  function MainController($timeout, $localStorage) {
    var vm = this;

    vm.awesomeThings = [];
    vm.classAnimation = '';
    vm.creationDate = 1466700649301;
  }
})();
