(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('WxSetMenuEditController', WxSetMenuEditController);

  WxSetMenuEditController.$inject = ['$timeout','$scope','$state', '$stateParams','WxSetMenu','entity','uibDateParser'];

  function WxSetMenuEditController($timeout,$scope, $state, $stateParams, WxSetMenu, entity, uibDateParser) {
    var vm = this;
    vm.menu = entity;
    vm.clear = clear;
    vm.save = save;
    vm.load=load;
    vm.menus=[];
    vm.allMenu=allMenu;
    vm.load(vm.menu.id);
    vm.allMenu();


    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function allMenu() {
      WxSetMenu.wxMenuLoadMenu().query(getSuccess, onError);
    }
    function clear() {
      $state.go('wxSetMenu');
    }

    function save() {
      vm.isSaving = true;
      WxSetMenu.wxMenuUpdate().update(vm.menu, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:wxSetMenuUpdate', result);
      vm.isSaving = true;
      $state.go('wxSetMenu');
    }

    function onSaveError() {
      vm.isSaving = false;
    }

    function load(id) {
      vm.menu.id=id;
      WxSetMenu.wxMenuLoadSearch(1,1).query(vm.menu, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.menu = data.rows[0];
    }
    function getSuccess(data, headers) {
      console.log('getSuccess');
      console.log(data);
      vm.menus = data.rows;
    }
    function onError(error) {
      console.log('error');
    }
  }
})();
