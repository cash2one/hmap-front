/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetailShowController', TaskDetailShowController);

  TaskDetailShowController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','TaskDetail'];

  function TaskDetailShowController($timeout,$scope,$stateParams, $uibModalInstance, entity,TaskDetail) {
    var vm = this;

    vm.show = entity;
    vm.clear = clear;
    vm.load=load;
    vm.job=""

    vm.clientId={};
    vm.requestUrl={};
    vm.param={};
    vm.accessTokenUri={};
    vm.clientSecret={};

    vm.load(vm.show);

    function load(job) {
      TaskDetail.TaskDetailFound().query(job, onSuccess, onError);
    }
    function onSuccess(data) {
      //console.log('onSuccess');
      //console.log(data);
      vm.job = data.rows[0];

      angular.forEach(vm.job.jobDatas, function (data) {
        if(data.name==="clientId"){
          vm.clientId.value=data.value;
        }
        if(data.name==="clientSecret"){
          vm.clientSecret.value=data.value;
        }
        if(data.name==="accessTokenUri"){
          vm.accessTokenUri.value=data.value;
        }
        if(data.name==="param"){
          vm.param.value=data.value;
        }
        if(data.name==="requestUrl"){
          vm.requestUrl.value=data.value;
        }
      });
    }
    function onError(error) {
      //console.log('error');
    }

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }
  }
})();
