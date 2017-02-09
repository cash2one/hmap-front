/**
 * Created by user on 2016/8/4.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('HeaderDetailController', HeaderDetailController);

  HeaderDetailController.$inject = ['Thirdparty', 'HeaderService', '$state', 'entity', '$timeout','Hmapfe','toastr'];

  function HeaderDetailController(Thirdparty, HeaderService, $state, entity, $timeout,Hmapfe,toastr) {
    var vm = this;
    vm.update = update;
    vm.cancel = cancel;
    vm.header = entity;

    vm.header.authType = 'NO_AUTH';
    vm.syncMsg="同步到行";
    vm.syncLoading = false;
    vm.getHeader = getHeader;
    vm.change = change;
    vm.loadAllThirdparty = loadAllThirdParty;
    vm.syncLines = syncLines;
    vm.getHeader(vm.header);
    vm.loadAllThirdparty();

    vm.requestFormat = ["raw"];

    vm.flag = [
      {code: "Y", name: "是"},
      {code: "N", name: "否"}
    ];

    function getHeader(header) {
      Hmapfe.log("vm.header:"+vm.header.headerId);
      if(vm.header.headerId != null) {
        HeaderService.query().query(vm.header, onQuerySuccess, onError);
      }
    }

    function update() {
      if (vm.header.headerId) {
        HeaderService.update().save(vm.header, onSuccess, onError)
      }
      else {
        HeaderService.add().save(vm.header, onSuccess, onError)
      }
    }

    function onQuerySuccess(data) {
      Hmapfe.log("header data:"+angular.toJson(data));
      vm.header = data.rows[0];

      if (vm.header.authType == 'BASIC_AUTH') {
        vm.header.isBasic = true;
        vm.header.isAuth = false;
      }
      if (vm.header.authType == 'OAUTH2') {
        vm.header.isAuth = true;
        vm.header.isBasic = false;
      }
      if (vm.header.authType == 'NO_AUTH') {
        vm.header.isBasic = false;
        vm.header.isAuth = false;
        Hmapfe.log('NO_AUTH');

      }
    }

    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(angular.toJson(data));
      vm.result = data;
      //console.log("update result"+angular.toJson(data));
      if (data.success) {
        toastr.success('保存成功！','信息提示');
        return $state.go("header");
      }
    }

    function onError(error) {
      //console.log('error');

    }

    function onMockSuccess(data, headers) {
      console.log(data);
     if(data.success==true){
       vm.syncMsg="同步成功";
     }
      else{
       vm.syncMsg="同步失败";
     }
      vm.syncLoading = false;
    }

    function syncLines() {
      vm.syncLoading = true;
      console.log('syncLines');
      HeaderService.syncMock().save(vm.header, onMockSuccess, onError);
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

    function change() {
      if (vm.header.authType == 'BASIC_AUTH') {
        vm.header.isBasic = true;
        vm.header.isAuth = false;
      }
      if (vm.header.authType == 'OAUTH2') {
        vm.header.isAuth = true;
        vm.header.isBasic = false;
      }
      if (vm.header.authType == 'NO_AUTH') {
        vm.header.isBasic = false;
        vm.header.isAuth = false;
        Hmapfe.log('NO_AUTH');

      }
    }

    function loadAllThirdParty() {
      Thirdparty.query({
        page: 1,
        pagesize: 100
      }, onThirdPartySuccess, onError);
    }

    function onThirdPartySuccess(data, headers) {
      vm.thirdpartys = data.rows;
    }
  }
})();
