/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('AppEditionDialogController', AppEditionDialogController);

  AppEditionDialogController.$inject = ['AppAuthService','$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','AppEdition','toastr','paginationConstants'];

  function AppEditionDialogController(AppAuthService,$timeout, $scope, $stateParams, $uibModalInstance, entity, AppEdition,toastr,paginationConstants) {
    var vm = this;

    vm.appedition = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.popupOpen = popupOpen;
    vm.load=load;

    vm.disabled = false;
    vm.searchApp={};
    vm.hmsAppAuth = null;
    var hmsAppAuth = vm.hmsAppAuth;
    vm.page = 1;
    vm.totalItems = null;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    var page = vm.page;
    var pagesize = paginationConstants.itemsPerPage;



    vm.load(vm.appedition.id);

    loadAllAppAuth(hmsAppAuth, page, pagesize);

    vm.Equipments = [
      {id:'iOS',name:'iOS'},
      {id:'Android',name:'Android'},
      {id:'Windows Phone',name:'Windows Phone'}
    ];
    vm.state = [
      {id:'Y',name:'是'},
      {id:'N',name:'否'}
    ];

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.isSaving = true;
      if (vm.appedition.id !== null) {
        AppEdition.update(vm.appedition, onSaveSuccess, onSaveError);
      } else {
        AppEdition.save(vm.appedition, onSaveSuccess, onSaveError);
      }
    }

    function onSaveSuccess(result) {
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:appeditionUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = true;
    }

    function onSaveError() {
      vm.isSaving = false;
    }

    function dateOptions() {
      var options = {
        dateDisabled: disabled,
        formatYear: 'yy',
        maxDate: new Date(2020, 5, 22),
        minDate: new Date(),
        startingDay: 1
      };
      return options;
    }

    function popupOpen() {
      vm.isOpen = true;
    }



    function load(id) {
      if (id) {
        ////console.log('loadone');
        vm.disabled = true;
        AppEdition.get({id: id}, function (result) {
          vm.appedition = result.rows[0];
          vm.appId = vm.appedition.appId;
        });
      }
    }

    function loadAllAppAuth(hmsAppAuth, page, pagesize) {
      vm.searchApp.page = vm.page;
      vm.searchApp.pagesize = paginationConstants.itemsPerPage;
      AppAuthService.findAppAuth().query(vm.searchApp, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      vm.result = data.rows;
      vm.totalItems = data.total;
    }

    function onError(error) {
      console.log('error');
    }

  }
})();
