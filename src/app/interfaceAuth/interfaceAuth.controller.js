/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function () {
  'use strict';

  angular.module("hmapFront").controller("InterfaceAuthController", InterfaceAuthController);

  InterfaceAuthController.$inject = ['$state','entity','InterfaceAuthService'];

  function InterfaceAuthController($state,entity,InterfaceAuthService){
    var vm = this;
    vm.interfaceAuth = entity;
    vm.selectAuthByHeaderId = selectAuthByHeaderId;
    vm.selectAuthByLineId = selectAuthByLineId;
    if(vm.interfaceAuth.interfaceLineId == null || vm.interfaceAuth.interfaceLineId == undefined || vm.interfaceAuth.interfaceLineId == ""){
      //console.log("11111111headerId");
      vm.selectAuthByHeaderId(vm.interfaceAuth);
    }else{
      //console.log("22222222lineId");
      vm.selectAuthByLineId(vm.interfaceAuth);
    }

    //根据HeaderId查询授权
    function selectAuthByHeaderId(interfaceAuth){
      return InterfaceAuthService.selectAuthByHeaderId().query(interfaceAuth,onHeaderAndLineSuccess,onError);
    }

    //根据LineId查询授权
    function selectAuthByLineId(interfaceAuth){
      return InterfaceAuthService.selectAuthByLineId().query(interfaceAuth,onHeaderAndLineSuccess,onError);
    }

    function onHeaderAndLineSuccess(data){
        vm.interfaceAuthes = data.rows;
        //console.log("vm.interfaceAuthes header:" + angular.toJson(vm.interfaceAuthes));
    }

    //删除授权
    vm.delete = function (interfaceAuth){
      InterfaceAuthService.deleteInterfaceAuth().query(interfaceAuth,onDeleteSuccess,onError);
    };

    function onDeleteSuccess(data){
        var flag = data.success;
        //console.log("delete result:" + angular.toJson(flag));
        if (flag) {
          return $state.go('interfaceAuthIndex', null, {reload: true});
        }
    }

    function onError(error) {
      //console.log('error');
    }
  }
})();
