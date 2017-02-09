/**
 * Created by user on 2016/8/4.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('EditHeaderController', EditHeaderController);

  EditHeaderController.$inject = ['LineService','EditHeaderService', '$state' ,'entity'];

  function EditHeaderController(LineService,EditHeaderService,  $state, entity) {
    var vm = this;
    vm.update = update;
    vm.cancel = cancel;

    vm.header = entity;
    getHeader(vm.header);

    vm.interfaceType = ["REST", "SOAP","PLSQL"];
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
      EditHeaderService.querySystemType().get(function(result) {
        //console.log("result:::::::::"+angular.toJson(result));
        vm.systemTypes = result.rows;
      });
    }

    function getHeader(header){
      return LineService.getHeaderByHeaderId(header)
        .then(function(data){
          vm.header = data.rows[0];
        })
    };


    function update(){
      EditHeaderService.query().query(vm.header, onSuccess, onError)
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(angular.toJson(data));
      vm.result = data;
      //console.log("update result"+angular.toJson(data));
      if (data.success) {
        return $state.go("header");
      }
    }

    function onError(error) {
      //console.log('error');

    }


    /*function update() {
      return EditHeaderService.updateHeader(vm.header)
        .then(function (data) {
          vm.result = data;
          //console.log("result00000"+angular.toJson(data));
          if (data.success) {
            return $state.go("header");
          }

        });

    }*/

    function cancel() {
      $state.go("header");
    }

  }


})();
