/**
 * Created by user on 2016/8/10.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddCodingController', AddCodingController);

  AddCodingController.$inject = ['CodingService', '$scope', '$state', '$uibModalInstance','toastr'];

  function AddCodingController(CodingService, $scope, $state, $uibModalInstance,toastr) {
    var vm = this;
    vm.code = null;
    vm.clear = clear;

    vm.add = add;

    function add() {
      //console.log("code:" + angular.toJson(vm.code));
      return CodingService.addCoding(vm.code)
        .then(function (data) {
          //console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            toastr.success('保存成功！','信息提示');
            $uibModalInstance.close();
            return $state.go('coding', null, {reload: true});
          }

        });

    };


    function clear() {
      $uibModalInstance.dismiss('cancel');
    }


  }


})();
