/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('SchedulerController', SchedulerController);

  SchedulerController.$inject = ['$timeout', 'TaskDetail','$state', '$stateParams','User','entity','uibDateParser'];

  function SchedulerController(paginationConstants, TaskDetail, $state, $stateParams, User, entity, uibDateParser) {
    var vm = this;
    vm.loadAll = loadAll;
    vm.getScheduler = getScheduler;
    vm.schedulers = [];
    vm.clear = clear;
    vm.start = start;
    vm.standby = standby;
    vm.jobs=[];
    vm.load=load;
    vm.pauseall=pauseall;
    vm.resumeall=resumeall;
    vm.load();
    vm.loadAll();

    function clear() {
      $state.go('scheduler');
    }

    function start() {
      TaskDetail.SchedulerStart().start({},loadSuccess, loadError);
    }
    function standby() {
      TaskDetail.SchedulerStandby().standby({},loadSuccess, loadError);
    }
    function pauseall() {
      TaskDetail.SchedulerPauseall().pauseall({},loadSuccess, loadError);
    }
    function resumeall() {
      TaskDetail.SchedulerResumeall().resumeall({},loadSuccess, loadError);
    }
    function load(){
      TaskDetail.SchedulerInfo().info({},loadSuccess, loadError)
    }
    function loadSuccess(data, headers) {
      //console.log('loadSuccess');
      //console.log(data);
      vm.schedulers = data.rows;
    }
    function loadError(error) {
      //console.log('error');
    }
    function loadAll() {
      TaskDetail.SchedulerQuery().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.jobs = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      //console.log('error');
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
