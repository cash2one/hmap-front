/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('SchedulerController', SchedulerController);

  SchedulerController.$inject = ['$timeout', '$scope','$state', '$stateParams','User','entity','uibDateParser'];

  function SchedulerController(paginationConstants, $scope, $state, $stateParams, User, entity, uibDateParser) {
    var vm = this;
    vm.loadAll = loadAll;
    vm.getScheduler = getScheduler;
    vm.scheduler = entity;
    vm.clear = clear;
    vm.start = start;
    vm.standby = standby;
    vm.load=load;

    vm.loadAll();

    function clear() {
      $state.go('scheduler');
    }

    function start() {

    }
    function standby() {

    }
    function loadAll() {
      User.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(result) {
      $scope.$emit('hmapFront:userUpdate', result);
      vm.isSaving = true;
      $state.go('user');
    }

    function onError() {
      vm.isSaving = false;
    }

    function getScheduler(id) {
      if (id) {
        User.get({id: id}, function (result) {
          vm.user = result.rows[0];
          vm.user.startActiveDate=uibDateParser.parse(vm.user.startActiveDate,"yyyy-MM-dd");
          vm.user.endActiveDate=uibDateParser.parse(vm.user.endActiveDate,"yyyy-MM-dd");
        });
      }
    }

  }
})();
