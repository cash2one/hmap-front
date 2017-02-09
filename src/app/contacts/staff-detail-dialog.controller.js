/**
 * Created by zhouzy on 2016/11/11 0011.
 */
/**
 * Created by zhouzy on 2016/8/31 0031.
 */
/**
 * Created by zhouzy on 2016/8/31 0031.
 */
/**
 * Created by zhouzy on 2016/8/28 0028.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('StaffDialogController', StaffDialogController);

  StaffDialogController.$inject = ['Contacts', 'paginationConstants', 'entity', '$uibModalInstance', '$state', '$scope', '$rootScope','$log','toastr','Hmapfe'];

  function StaffDialogController(Contacts, paginationConstants, entity, $uibModalInstance, $state, $scope, $rootScope,$log,toastr,Hmapfe) {
    var vm = this;
    vm.staff= entity;
    vm.saveStaff=saveStaff;
    vm.loadStaffDetail=loadStaffDetail;
    vm.loadStaffDetail();

    function saveStaff(){
      Contacts.createOrUpdateTag().save(vm.contactTag, onSuccess,onError);
    }
    function onSuccess(data, headers) {
      vm.contactTag = data.rows[0];
      Contacts.newTag=vm.contactTag;
      $rootScope.$broadcast('handleAddNewTag');
      $uibModalInstance.dismiss('ok');
      toastr.success('保存成功!', '提示信息');
    }

    function onError(error) {
      $log.info('error');
    }

    function loadStaffDetail(){
      if(vm.staff.accountNumber){
        var searObj={key:vm.staff.accountNumber}
        Contacts.getStaffDetail().search(searObj, onStaffLoadSuccess,onError);
      }
    }
    function onStaffLoadSuccess(data, headers){
      vm.staff=data.rows[0];
      Hmapfe.log(vm.staff);
    }
  }
})();
