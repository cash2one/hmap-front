/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('SchedulerController', SchedulerController);

  SchedulerController.$inject = ['$timeout', 'TaskDetali','$state', '$stateParams','User','entity','uibDateParser'];

  function SchedulerController(paginationConstants, TaskDetali, $state, $stateParams, User, entity, uibDateParser) {
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
      TaskDetali.SchedulerStart().start({},loadSuccess, loadError);
    }
    function standby() {
      TaskDetali.SchedulerStandby().standby({},loadSuccess, loadError);
    }
    function pauseall() {
      TaskDetali.SchedulerPauseall().pauseall({},loadSuccess, loadError);
    }
    function resumeall() {
      TaskDetali.SchedulerResumeall().resumeall({},loadSuccess, loadError);
    }
    function load(){
      TaskDetali.SchedulerInfo().info({},loadSuccess, loadError)
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
      TaskDetali.SchedulerQuery().query({
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
