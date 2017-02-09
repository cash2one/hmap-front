(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('TaskDetailController', TaskDetailController);
  TaskDetailController.$inject = ['$state','TaskDetail','entity','paginationConstants'];
  /** @ngInject */
  function TaskDetailController( $state, TaskDetail,entity, paginationConstants) {
    var vm = this;
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
    vm.setColor=setColor;
    vm.resumeJobs=resumeJobs;
    vm.updateSelectionAll=updateSelectionAll;
    vm.updateSelection=updateSelection;
    vm.updateSelectedAll=updateSelectedAll;
    vm.updateSelected=updateSelected;
    vm.isSelected=isSelected;
    vm.loadAll();
    vm.selected = [];
    vm.selectedTags = [];
    vm.jobs=[];
    function loadAll() {
      TaskDetail.TaskDetailFound().query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function resumeJobs(){
      TaskDetail.TaskDetailResume().update(
        vm.selectedTags );
    }
    function delJobs(){
      TaskDetail.TaskDetailDelete().update(
        vm.selectedTags ,delSuccess, onError);
    }
    function delSuccess() {
      vm.loadAll();
    }
    function pauseJobs(){
      TaskDetail.TaskDetailPause().update(
        vm.selectedTags );
    }
    function loadJobs(){
      //console.log(vm.dto.jobName);
      vm.dto.page=vm.page;
      vm.dto.pagesize=vm.pagesize;
      TaskDetail.TaskDetailFound().query(
        vm.dto , onSuccess, onError
      );
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
    function transition () {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }
    function pageChanged() {
      //console.log('Page changed to: ' +vm.page);
      loadAll();
    }
    function updateSelected(action,id,data){
      if(action == 'add' && vm.selected.indexOf(id) == -1){
        vm.selected.push(id);
        vm.selectedTags.push(data);
      }
      if(action == 'remove' && vm.selected.indexOf(id)!=-1){
        var idx = vm.selected.indexOf(id);
        vm.selected.splice(idx,1);
        vm.selectedTags.splice(idx,1);
      }
    };
    function updateSelection($event, id){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelected(action,id,{jobName:id,jobGroup:checkbox.name});
      //console.log("selected:"+vm.selected);
      angular.forEach(vm.selectedTags, function(obj,index,array) {
        //console.log("selectedTags:" +index+"---:"+obj.jobName+","+obj.jobGroup);
      })
    };
    function isSelected(id){
      return vm.selected.indexOf(id)>=0;
    };

    function updateSelectedAll(action){
      if(action == 'add'){
        vm.selected=[];
        vm.selectedTags=[];
        angular.forEach(vm.jobs, function(obj,index,array){
          vm.selected.push(obj.jobName);
          vm.selectedTags.push({jobName:obj.jobName,jobGroup:obj.jobGroup});
        });
      }
      if(action == 'remove'){
        vm.selected=[];
        vm.selectedTags=[];
      }
    };
    function updateSelectionAll($event){
      var checkbox = $event.target;
      var action = (checkbox.checked?'add':'remove');
      updateSelectedAll(action);
      //console.log("selected:"+vm.selected);
      angular.forEach(vm.selectedTags, function(obj,index,array) {
        //console.log("selectedTags:" +index+"---:"+obj.jobName+","+obj.jobGroup);
      })
    }
    function setColor (status) {
      var p = "";
      if ("Finish" == status) {
        p = '#00FF00';
      } else if ("Failed" == status) {
        p = '#F75D59';
      } else if ("Vetoed" == status) {
        p = '#FDD017';
      }
      return {"color": p};
    }
  }
})();
