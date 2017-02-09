/**
 * Created by user on 2016/8/23.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('TestController', TestController);

  TestController.$inject = ['TestService', '$state', 'entity'];

  function TestController(TestService, $state, entity) {
    var vm = this;
    vm.line = entity;
    vm.example = entity;
    findHeaderAndLine(vm.line);
    getExampleByLine(vm.line);

    function findHeaderAndLine(line) {
      return TestService.findHeaderAndLineByLine(line)
        .then(function (data) {
          vm.header = data.rows[0];
          //console.log("result headerAndLine:" + angular.toJson(data));

        });

    };

    function getExampleByLine(line) {
      return TestService.getParamsExample(line)
        .then(function (data) {
          vm.example = data.rows[0];
        })
    };

    vm.save = function () {
      vm.example.lineId = vm.header.lineId;
      vm.example.inputExample = vm.inputParams;
      vm.example.outputExample = vm.outputParams;
      return TestService.updateParamsExample(vm.example)
        .then(function (data) {
          vm.result = data.success;
          //console.log("save example:" + vm.result);
        })

    }


    vm.copyInputExample = function () {
      //console.log("inputExample:" + vm.example.inputExample);
      vm.inputParams = vm.example.inputExample;
    }


  }


})();
