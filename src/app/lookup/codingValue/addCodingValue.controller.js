/**
 * Created by user on 2016/8/10.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddCodingValueController', AddCodingValueController);

  AddCodingValueController.$inject = ['CodingValueService', '$state', '$uibModalInstance', 'entity','toastr'];

  function AddCodingValueController(CodingValueService, $state, $uibModalInstance, entity,toastr) {
    var vm = this;
    vm.codeValue = entity;
    vm.clear = clear;
    vm.add = add;

    //console.log("codeValue:" + angular.toJson(vm.codeValue));

    /*var codeValue = vm.codeValue;
    getCodeValue(codeValue);
    function getCodeValue(codeValue) {
      return CodingValueService.findCodeValuesByCodeValue(codeValue)
        .then(function (data) {
          vm.codeValue = data.rows[0];
          //console.log("result codeValue" + angular.toJson(vm.codeValue));
        })
    }*/

    function add() {
      //console.log("codeValue:" + angular.toJson(vm.codeValue));
      return CodingValueService.addCodingValue(vm.codeValue)
        .then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            toastr.success('保存成功！','信息提示');
            $uibModalInstance.close();
            return null;
          }

        })

    }


    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
