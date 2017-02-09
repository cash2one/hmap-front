/**
 * Created by user on 2016/8/10.
 */


(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('userChangeController', userChangeController);

  userChangeController.$inject = ['$scope', '$state','entity','$uibModalInstance','toastr','AnnualMeeting'];

  function userChangeController($scope, $state,entity, $uibModalInstance,toastr,AnnualMeeting) {
    var vm = this;
    vm.user=entity;
    vm.tables=[];
    vm.clear = clear;
    vm.save = save;
    vm.loadSearch=loadSearch;
    vm.loadSearch(entity.meetingId);
    vm.tableId="";
    vm.tableNum="";

    function loadSearch(id){
      AnnualMeeting.loadTables().query({id: id}, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      vm.tables = data.rows;
    }
    function onError(error) {
      toastr.error("加载出错！",'信息提示');
    }
    function save() {
      vm.isSaving = true;
      AnnualMeeting.changeTable().save({empNo:entity.userId,tableId:vm.tableId},changeSuccess, changeError)
    }
    function changeSuccess(data, headers) {
      $uibModalInstance.dismiss('ok');
    }
    function changeError(error) {
      toastr.error("换桌出错！",'信息提示');
      vm.isSaving = false;
    }
    function clear() {
      $uibModalInstance.dismiss('cancel');
    }
  }


})();
