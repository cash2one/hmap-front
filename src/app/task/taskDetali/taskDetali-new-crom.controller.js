/**
 * Created by chenlei on 2016/8/5.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetaliNewCromController', TaskDetaliNewCromController);

  TaskDetaliNewCromController.$inject = ['$timeout', '$scope', '$stateParams', '$uibModalInstance', 'entity','TaskDetaliCreate'];

  function TaskDetaliNewCromController($timeout, $scope, $stateParams, $uibModalInstance, entity, TaskDetaliCreate) {
    var vm = this;

    vm.taskDetali = entity;
    vm.clear = clear;
    vm.save = save;
    vm.dateOptions = dateOptions;
    vm.startOpen = startOpen;
    vm.endOpen = endOpen;
    vm.taskDetali.jobGroup='DEFAULT';
    vm.taskDetali.cronExpression='0 * * * * ?';
    vm.addRow=addRow;
    vm.delRow=delRow;
    vm.taskDetali.jobData=[];

    $timeout(function () {
      angular.element('.form-group:eq(1)>input').focus();
    });

    function clear() {
      $uibModalInstance.dismiss('cancel');
    }

    function save() {
      vm.taskDetali.triggerType='CRON';
      vm.taskDetali.startTime=vm.taskDetali.startTime.valueOf();
      vm.taskDetali.endTime=vm.taskDetali.endTime.valueOf();
      vm.isSaving = true;
      TaskDetaliCreate.save(vm.taskDetali, onSaveSuccess, onSaveError);
    }

    function onSaveSuccess(result) {
      $scope.$emit('hmapFront:taskDetaliUpdate', result);
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
      vm.taskDetali.jobData.push({name:"",value:""})
    }
    function delRow(){
      for(var i=$scope.selected.length-1;i>=0;i--){
        vm.taskDetali.jobData.splice($scope.selected[i],1);
      }
      $scope.selected=[];
    }
    $scope.selected=[];
    var updateSelected = function(action,id){
      if(action == 'add' && $scope.selected.indexOf(id) == -1){
        $scope.selected.push(id);
      }
      if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
        var idx = $scope.selected.indexOf(id);
        $scope.selected.splice(idx,1);
      }
    }
    $scope.updateSelection = function($event, id){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelected(action,id);
      console.log("selected:"+$scope.selected);
    }
    $scope.isSelected = function(id){
      return $scope.selected.indexOf(id)>=0;
    }

    var updateSelectedAll = function(action){
      if(action == 'add'){
        $scope.selected=[];
        angular.forEach(vm.taskDetali.jobData, function(data,index,array){
          $scope.selected.push(index);
        });
      }
      if(action == 'remove'){
        $scope.selected=[];
      }
    }
    $scope.updateSelectionAll = function($event){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelectedAll(action);
      console.log("selected:"+$scope.selected);
    }
  }
})();
