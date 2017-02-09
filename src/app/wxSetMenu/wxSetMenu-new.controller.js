(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('WxSetMenuNewController', WxSetMenuNewController);

  WxSetMenuNewController.$inject = ['$timeout','$scope','$state', '$stateParams','WxSetMenu','entity','uibDateParser'];

  function WxSetMenuNewController($timeout,$scope, $state, $stateParams, WxSetMenu, entity, uibDateParser) {
    var vm = this;
    vm.menu = entity;
    vm.menus=[];
    vm.allMenu=allMenu;
    vm.clear = clear;
    vm.save = save;

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });
    function allMenu() {
      WxSetMenu.wxMenuLoadMenu().query(getSuccess, onError);
    }
    function getSuccess(data, headers) {
      console.log('getSuccess');
      console.log(data);
      vm.menus = data.rows;
    }
    function onError(error) {
      console.log('error');
    }
    function clear() {
      $state.go('wxSetMenu');
    }
    function save() {
      WxSetMenu.wxMenuSave.save(vm.menu, onSaveSuccess, onSaveError);
    }
    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:wxSetMenuUpdate', result);
      vm.isSaving = true;
      $state.go('wxSetMenu');
    }
    function onSaveError() {
      vm.isSaving = false;
    }
  }
})();
