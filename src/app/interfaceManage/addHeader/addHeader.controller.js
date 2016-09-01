/**
 * Created by user on 2016/8/8.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AddHeaderController', AddHeaderController);

  AddHeaderController.$inject = ['AddHeaderService', '$state'];

  function AddHeaderController(AddHeaderService, $state) {
    var vm = this;
    vm.add = add;
    vm.cancel = cancel;

    vm.header = null;

    vm.interfaceType = ["REST", "SOAP","PLSQL"];
    //vm.header.interfaceType = "REST";
    vm.requestMethod = ["GET", "POST"];
    vm.requestFormat = ["raw"];
    vm.flag = [
      {code : "Y", name : "是"},
      {code : "N", name : "否"}
    ];


    function add() {
      return AddHeaderService.addHeader(vm.header)
        .then(function (data) {
          vm.result = data;
          console.log("result00000"+angular.toJson(data));
          if (data.success) {
            return $state.go("header");
          }

        });

    }

    function cancel() {
      $state.go("header");
    }

  }


})();
