/**
 * Created by zhouzy on 2016/8/4 0004.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ThirdpartyDetailController', ThirdpartyDetailController);

  ThirdpartyDetailController.$inject = ['$stateParams', 'Thirdparty'];

  function ThirdpartyDetailController ($stateParams, Thirdparty) {
    var vm = this;

    vm.load = load;
    vm.thirdparty = {};

    vm.load($stateParams.id);

    function load (id) {
      Thirdparty.get({id: id}, function(result) {

        vm.thirdparty = result.rows[0];
        console.log(vm.thirdparty);
        console.log(vm.thirdparty.appName);
      });
    }
  }
})();
