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
    .controller('TagDialogController', TagDialogController);

  TagDialogController.$inject = ['Contacts', 'paginationConstants', 'entity', '$uibModalInstance', '$state', '$scope', '$rootScope','$log','toastr'];

  function TagDialogController(Contacts, paginationConstants, entity, $uibModalInstance, $state, $scope, $rootScope,$log,toastr) {
    var vm = this;
    vm.contactTag= entity;
    vm.saveTag=saveTag;
    vm.clear = clear;

    function saveTag(){
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
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

  }
})();
