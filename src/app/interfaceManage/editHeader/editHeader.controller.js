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


    function getHeader(header){
      return LineService.getHeaderByHeaderId(header)
        .then(function(data){
          vm.header = data.rows[0];
        })
    };


    function update() {
      return EditHeaderService.updateHeader(vm.header)
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
