/**
 * Created by user on 2016/8/9.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditCodingController', EditCodingController);

  EditCodingController.$inject = ['CodingService', '$scope', '$state', '$uibModalInstance', 'entity','toastr'];

  function EditCodingController(CodingService, $scope, $state, $uibModalInstance, entity,toastr) {
    var vm = this;
    vm.code = entity;
    vm.clear = clear;

    vm.update = update;
    //console.log("code:" + angular.toJson(vm.code));

    var code = vm.code;
    getCodeByCodeId(code);
    function getCodeByCodeId(code) {
      return CodingService.findCodes(code)
        .then(function (data) {
          vm.code = data.rows[0];
          //console.log("result00000" + angular.toJson(vm.code));
        })
    }

    function update() {
      //console.log("code:" + angular.toJson(vm.code));
      return CodingService.updateCodes(vm.code)
        .then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            toastr.success('保存成功！','信息提示');
            $uibModalInstance.close();
            return $state.go('coding', null, {reload: true});
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
