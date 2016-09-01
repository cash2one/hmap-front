/**
 * Created by user on 2016/8/10.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditCodingValueController', EditCodingValueController);

  EditCodingValueController.$inject = ['CodingValueService', '$state', '$uibModalInstance', 'entity'];

  function EditCodingValueController(CodingValueService, $state, $uibModalInstance, entity) {
    var vm = this;
    vm.codeValue = entity;
    vm.clear = clear;
    vm.update = update;

    console.log("codeValue:" + angular.toJson(vm.codeValue));

    var codeValue = vm.codeValue;
    getCodeValue(codeValue);
    function getCodeValue(codeValue) {
      return CodingValueService.findCodeValuesByCodeValue(codeValue)
        .then(function (data) {
          vm.codeValue = data.rows[0];
          console.log("result codeValue" + angular.toJson(vm.codeValue));
        })
    }

    function update() {
      console.log("code:" + angular.toJson(vm.codeValue));
      return CodingValueService.updateCodeValue(vm.codeValue)
        .then(function (data) {
          console.log("resultData:" + angular.toJson(data));
          if (data.success) {
            $uibModalInstance.close();
            return null;
            //return $state.go('codingValue', null, {reload: true});
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
