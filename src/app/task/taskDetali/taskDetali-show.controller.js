/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetaliShowController', TaskDetaliShowController);

  TaskDetaliShowController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','TaskDetali'];

  function TaskDetaliShowController($timeout,$scope,$stateParams, $uibModalInstance, entity,TaskDetali) {
    var vm = this;

    vm.show = entity;
    vm.clear = clear;
    vm.load=load;
    vm.job=""

    vm.load(vm.show);

    function load(job) {
      TaskDetali.TaskDetaliFound().query(job, onSuccess, onError);
    }
    function onSuccess(data) {
      //console.log('onSuccess');
      //console.log(data);
      vm.job = data.rows[0];
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
