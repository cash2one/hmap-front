(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetaliController', TaskDetaliController);
  TaskDetaliController.$inject = ['$scope','$state','TaskDetaliFound','TaskDetaliDelete','TaskDetaliPause','TaskDetaliResume','entity','paginationConstants'];
  /** @ngInject */
  function TaskDetaliController( $scope,$state, TaskDetaliFound,TaskDetaliDelete,TaskDetaliPause,TaskDetaliResume,entity, paginationConstants) {
    var vm = this;
    $scope.num=0;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.dto ="";
    vm.loadJobs=loadJobs;
    vm.pauseJobs=pauseJobs;
    vm.delJobs=delJobs;
    vm.resumeJobs=resumeJobs;
    vm.loadAll();
    $scope.selected = [];
    $scope.selectedTags = [];
    vm.jobs=[]
    function loadAll() {
      TaskDetaliFound.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function resumeJobs(){
      TaskDetaliResume.update(
        $scope.selectedTags );
    }
    function delJobs(){
      TaskDetaliDelete.update(
        $scope.selectedTags ,delSuccess, onError);
    }
    function delSuccess() {
      vm.loadAll();
    }
    function pauseJobs(){
      TaskDetaliPause.update(
        $scope.selectedTags );
    }
    function loadJobs(){
      console.log(vm.dto.jobName);
      vm.dto.page=vm.page;
      vm.dto.pagesize=vm.pagesize;
      TaskDetaliFound.query(
        vm.dto , onSuccess, onError
      );
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.jobs = data.rows;
      vm.totalItems =  data.total;
    }
    function onError(error) {
      console.log('error');
    }
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }
    function pageChanged() {
      console.log('Page changed to: ' +vm.page);
      loadAll();
    };

    var updateSelected = function(action,id,data){
      if(action == 'add' && $scope.selected.indexOf(id) == -1){
        $scope.selected.push(id);
        $scope.selectedTags.push(data);
      }
      if(action == 'remove' && $scope.selected.indexOf(id)!=-1){
        var idx = $scope.selected.indexOf(id);
        $scope.selected.splice(idx,1);
        $scope.selectedTags.splice(idx,1);
      }
    };
    $scope.updateSelection = function($event, id){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelected(action,id,{jobName:id,jobGroup:checkbox.name});
      console.log("selected:"+$scope.selected);
      angular.forEach($scope.selectedTags, function(obj,index,array) {
        console.log("selectedTags:" +index+"---:"+obj.jobName+","+obj.jobGroup);
      })
    };
    $scope.isSelected = function(id){
      return $scope.selected.indexOf(id)>=0;
    };


    var updateSelectedAll = function(action){
      if(action == 'add'){
        $scope.selected=[];
        $scope.selectedTags=[];
        angular.forEach(vm.jobs, function(obj,index,array){
          $scope.selected.push(obj.jobName);
          $scope.selectedTags.push({jobName:obj.jobName,jobGroup:obj.jobGroup});
        });
      }
      if(action == 'remove'){
        $scope.selected=[];
        $scope.selectedTags=[];
      }
    };
    $scope.updateSelectionAll = function($event){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelectedAll(action);
      console.log("selected:"+$scope.selected);
      angular.forEach($scope.selectedTags, function(obj,index,array) {
        console.log("selectedTags:" +index+"---:"+obj.jobName+","+obj.jobGroup);
      })
    }
  }
})();
