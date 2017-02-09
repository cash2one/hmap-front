/**
 * Created by Administrator on 2016/11/29.
 */
/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetailNewRestController', TaskDetailNewRestController);

  TaskDetailNewRestController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','TaskDetail'];

  function TaskDetailNewRestController($timeout, $scope, $stateParams, $uibModalInstance, entity, TaskDetail) {
    var vm = this;

    vm.showFlag = false;
    vm.taskDetail = entity;
    vm.back = back;
    vm.show = show;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.startOpen = startOpen;
    vm.endOpen = endOpen;
    vm.taskDetail.jobGroup='DEFAULT';
    vm.taskDetail.jobClassName='hmap.core.job.common.CommonJob';
    vm.taskDetail.jobDatas=[];

    vm.getToken = getToken;
    vm.token = {
      token_url : '',
      client_id : '',
      client_secret : '',
      grant_type : 'client_credentials'
    };

    vm.requestUrl = {
      name:'requestUrl',
      value:''
    };
    vm.param = {
      name:'param',
      value:''
    };
    vm.accessTokenUri = {
      name:'accessTokenUri',
      value:''
    };
    vm.clientId = {
      name:'clientId',
      value:''
    };
    vm.clientSecret = {
      name:'clientSecret',
      value:''
    };
    //console.log(vm.taskDetail.jobData);
    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function back(){
      vm.showFlag = false;
    }

    function show(){
      vm.showFlag = true;
    }

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function getToken() {

      TaskDetail.AccessTokenGet().get(vm.token, onSaveSuccess2, onSaveError2);

    }

    function save() {



      vm.taskDetail.jobDatas.push(vm.requestUrl,vm.accessTokenUri,vm.clientId,vm.clientSecret,vm.param);
      vm.taskDetail.triggerType='SIMPLE';
      if(vm.taskDetail.startTime!=null){
        vm.taskDetail.startTime=vm.taskDetail.startTime.valueOf();
      }
      if(vm.taskDetail.endTime!=null){
        vm.taskDetail.endTime=vm.taskDetail.endTime.valueOf();
      }
      vm.isSaving = false;
      TaskDetail.TaskDetailCreate().save(vm.taskDetail, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:taskDetailUpdate', result);
      $uibModalInstance.close(result);
      vm.isSaving = true;
    }
    function onSaveSuccess2(result) {

      vm.data2.value = result.rows[0];
      vm.showFlag = false;
    }

    function onSaveError() {
      vm.isSaving = false;
    }
    function onSaveError2() {

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

    function startOpen() {
      vm.isStartOpen = true;
    }
    function endOpen() {
      vm.isEndOpen = true;
    }
  }
})();
