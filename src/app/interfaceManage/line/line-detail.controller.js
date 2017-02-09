/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('LineDetailController', LineDetailController);

  LineDetailController.$inject = ['LineService', '$state', 'entity','toastr'];

  function LineDetailController(LineService, $state, entity,toastr) {
    var vm = this;
    vm.line = entity;
    vm.update = update;
    vm.clear = clear;
    vm.getLine=getLine;

    vm.getLine(vm.line.lineId);

    vm.flag = [
      {code: "Y", name: "是"},
      {code: "N", name: "否"}
    ];

    //根据lineId获取line
    function getLine(lineId) {
      if(lineId){
        LineService.getLine().get({lineId: lineId}, onSuccess, onError);
      }
    };

    function onSuccess(data, headers) {
      vm.line = data.rows[0];
    };
    function onError(error) {
      //console.log('get line error');
    };

    //修改
    function update() {
      if(vm.line.lineId){
        LineService.updateLine().update(vm.line, updateSuccess, updateError);
      }
      else{
        LineService.insertLine().save(vm.line, updateSuccess, updateError);
      }
    };
    function updateSuccess(data, headers) {
      vm.result = data;
      if (data.success) {
        toastr.success('保存成功！','信息提示');
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
