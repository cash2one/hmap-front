/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddLineController', AddLineController);

  AddLineController.$inject = ['AddLineService', '$state', 'entity'];

  function AddLineController(AddLineService, $state, entity) {
    var vm = this;
    vm.line = entity;
    vm.add = add;
    vm.clear = clear;

    vm.flag = [
      {code: "Y", name: "是"},
      {code: "N", name: "否"}
    ];

    function add() {
      AddLineService.query(vm.line, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(angular.toJson(data));
      vm.result = data;
      if (data.success) {
        return $state.go("line", {headerId: entity.headerId});
      }
    }

    function onError(error) {
      //console.log('error');

    }

    function clear() {
      $state.go("line", {headerId: entity.headerId});
    }


  }


})();
