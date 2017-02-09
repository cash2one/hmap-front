/**
 * Created by zhusifeng on 2016/8/31.
 */
(function () {
  'use strict';
  angular.module('hmapFront')
         .controller('modifyPwdController', modifyPwdController);

  modifyPwdController.$inject = ['$state','$scope','SweetAlert','modifyPwdService'];
  function modifyPwdController($state,$scope,SweetAlert,modifyPwdService) {
    var vm = this;
    vm.modifyPwd=modifyPwd;

    function modifyPwd(){
      if(vm.newPwd!=vm.reNewPwd){
        vm.reNewPwd='';
        SweetAlert.error("确认密码不一致，请重新输入",{title:"提示"});
        return false;
      }
      var key = CryptoJS.enc.Utf8.parse("0102030405060708");
      var iv  = CryptoJS.enc.Utf8.parse('0102030405060708');
      var oldPwd=CryptoJS.AES.encrypt(vm.oldPwd, key, { iv: iv,mode:CryptoJS.mode.CBC});
      var newPwd=CryptoJS.AES.encrypt(vm.newPwd, key, { iv: iv,mode:CryptoJS.mode.CBC});
      var data={oldPwd:''+oldPwd,newPwd:''+newPwd};
      return modifyPwdService.modifyPwd().query(data,onSuccess,onError);
    }

    function onSuccess(){
      SweetAlert.success("修改成功",{title:"提示"});
      reset();
    }

    function onError(){
      SweetAlert.error("修改失败",{title:"提示"});
      reset();
    }

    function reset(){
      vm.oldPwd='';
      vm.newPwd='';
      vm.reNewPwd='';
    }

  }
})();

