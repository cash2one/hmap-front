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
    vm.selectSystemType = selectSystemType;
    vm.selectSystemType();

    function selectSystemType(){
      //console.log("111111111");
      AddHeaderService.querySystemType().get(function(result) {
        //console.log("result:::::::::"+angular.toJson(result));
        vm.systemTypes = result.rows;
      });
    }

    function add () {
      AddHeaderService.query().query(vm.header, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      vm.result = data;
      //console.log("insert result "+angular.toJson(data));
      if (data.success) {
        return $state.go("header");
      }
    }
    function onError(error) {
      //console.log('error');

    }

    function cancel() {
      $state.go("header");
    }

  }


})();
