/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditLineController', EditLineController);

  EditLineController.$inject = ['EditLineService', '$state', 'entity'];

  function EditLineController(EditLineService, $state, entity) {
    var vm = this;
    vm.line = entity;
    vm.update = update;
    vm.clear = clear;

    var lineId = vm.line.lineId;
    getLine(lineId);

    vm.flag = [
      {code: "Y", name: "是"},
      {code: "N", name: "否"}
    ];

    //根据lineId获取line
    function getLine(lineId) {
      EditLineService.getLine().get({lineId: lineId}, onSuccess, onError);
    };

    function onSuccess(data, headers) {
      vm.line = data.rows[0];
    };
    function onError(error) {
      //console.log('get line error');
    };

    //修改
    function update() {
      EditLineService.updateLine().update(vm.line, updateSuccess, updateError);
    };
    function updateSuccess(data, headers) {
      vm.result = data;
      if (data.success) {
        return $state.go("line", {headerId: vm.line.headerId});
      }
    };
    function updateError(error) {
      //console.log('update line error');
    };


    function clear() {
      $state.go("line", {headerId: vm.line.headerId});
    };


  }


})();
