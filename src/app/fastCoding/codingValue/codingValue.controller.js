/**
 * Created by user on 2016/8/10.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('CodingValueController', CodingValueController);

  CodingValueController.$inject = ['CodingValueService', 'CodingService', 'entity', '$state'];

  function CodingValueController(CodingValueService, CodingService, entity, $state) {
    var vm = this;
    vm.code = entity;
    getCodeValues(vm.code);
    getCodes(vm.code);


    function getCodes(code) {
      return CodingService.findCodes(code)
        .then(function (data) {
          vm.code = data.rows[0];
          console.log("result code" + angular.toJson(vm.code));
        })

    }

    function getCodeValues(code) {
      return CodingValueService.findCodeValuesByCodeValue(code)
        .then(function (data) {
          vm.codeValues = data.rows;
          console.log("result values" + angular.toJson(vm.codeValues));
        })

    }

    vm.search = function () {
      if (vm.codeValue.value === "") {
        vm.codeValue.value = undefined;
      }
      if (vm.codeValue.meaning === "") {
        vm.codeValue.meaning = undefined;
      }
      vm.codeValue.codeId = vm.code.codeId;
      var codeValue = vm.codeValue;

      getCodeValues(codeValue);

    }

    vm.delete = function (codeValue) {
      console.log("result codeValue" + angular.toJson(codeValue));
      return CodingValueService.deleteCodeValue(codeValue)
        .then(function (data) {
          var flag = data.success;
          console.log("delete result" + angular.toJson(flag));
          if (flag) {
            return $state.go('codingValue', null, {reload: true});
          }
        })

    }


    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};


  }


})();
