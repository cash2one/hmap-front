/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("InterfaceAuthIndexController", InterfaceAuthIndexController);

  InterfaceAuthIndexController.$inject = ['$state','entity','InterfaceAuthService'];

  function InterfaceAuthIndexController($state,entity,InterfaceAuthService){
    var vm = this;
    vm.interfaceAuth = entity;
    console.log("vm.interfaceAuth.headerId:" + vm.interfaceAuth.headerId);
    console.log("vm.interfaceAuth.lineId:" + vm.interfaceAuth.lineId);
    vm.selectAuthByHeaderId = selectAuthByHeaderId;
    vm.selectAuthByLineId = selectAuthByLineId;
    if(vm.interfaceAuth.headerId != null && vm.interfaceAuth.headerId != undefined && vm.interfaceAuth.headerId != ""){
      console.log("11111111headerId");
      vm.selectAuthByHeaderId(vm.interfaceAuth);
    }else{
      console.log("22222222lineId");
      vm.selectAuthByLineId(vm.interfaceAuth);
    }


    function selectAuthByHeaderId(interfaceAuth){
        return InterfaceAuthService.selectAuthByHeaderId(interfaceAuth).then(function (data) {
          vm.interfaceAuthes = data.rows;
          console.log("vm.interfaceAuthes header:" + angular.toJson(vm.interfaceAuthes));
        });
    }

    function selectAuthByLineId(interfaceAuth){
      return InterfaceAuthService.selectAuthByLineId(interfaceAuth).then(function (data) {
        vm.interfaceAuthes = data.rows;
        console.log("vm.interfaceAuthes line:" + angular.toJson(vm.interfaceAuthes));
      });
    }

    vm.delete = function (interfaceAuth){
      InterfaceAuthService.deleteInterfaceAuth(interfaceAuth)
        .then(function (data) {
          var flag = data.success;
          console.log("delete result:" + angular.toJson(flag));
          if (flag) {
            return $state.go('interfaceAuthIndex', null, {reload: true});
          }
        });
    }
  }
})();
