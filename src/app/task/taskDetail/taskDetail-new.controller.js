/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetailNewController', TaskDetailNewController);

  TaskDetailNewController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','TaskDetail','toastr'];

  function TaskDetailNewController($timeout, $scope, $stateParams, $uibModalInstance, entity, TaskDetail,toastr) {
    var vm = this;

    vm.taskDetail = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.startOpen = startOpen;
    vm.endOpen = endOpen;
    vm.taskDetail.jobGroup='DEFAULT';
    vm.addRow=addRow;
    vm.delRow=delRow;
    vm.taskDetail.jobData=[];
    vm.selected=[];

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.taskDetail.triggerType='SIMPLE';
      if(vm.taskDetail.startTime!=null){
        vm.taskDetail.startTime=vm.taskDetail.startTime.valueOf();
      }
      if(vm.taskDetail.endTime!=null){
        vm.taskDetail.endTime=vm.taskDetail.endTime.valueOf();
      }
      vm.isSaving = true;
      TaskDetail.TaskDetailCreate().save(vm.taskDetail, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(result) {
      toastr.success('保存成功！','信息提示');
      $scope.$emit('hmapFront:taskDetailUpdate', result);
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

    function startOpen() {
      vm.isStartOpen = true;
    }
    function endOpen() {
      vm.isEndOpen = true;
    }

    function addRow(){
      vm.taskDetail.jobData.push({name:"",value:""})
    }
    function delRow(){
      for(var i=vm.selected.length-1;i>=0;i--){
        vm.taskDetail.jobData.splice(vm.selected[i],1);
      }
      vm.selected=[];
    }
    var updateSelected = function(action,id){
      if(action == 'add' && vm.selected.indexOf(id) == -1){
        vm.selected.push(id);
      }
      if(action == 'remove' && vm.selected.indexOf(id)!=-1){
        var idx = vm.selected.indexOf(id);
        vm.selected.splice(idx,1);
      }
    };
    vm.updateSelection = function($event, id){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelected(action,id);
      //console.log("selected:"+$scope.selected);
    };
    vm.isSelected = function(id){
      return vm.selected.indexOf(id)>=0;
    };

    var updateSelectedAll = function(action){
      if(action == 'add'){
        vm.selected=[];
        angular.forEach(vm.taskDetail.jobData, function(data,index,array){
          vm.selected.push(index);
        });
      }
      if(action == 'remove'){
        vm.selected=[];
      }
    };
    vm.updateSelectionAll = function($event){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelectedAll(action);
      //console.log("selected:"+$scope.selected);
    }
  }
})();
