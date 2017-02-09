/**
 * Created by zhouzy on 2016/8/29 0029.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ResourceDetailController', ResourceDetailController);

  ResourceDetailController.$inject = ['$state','$stateParams', 'Resource','entity','$q','$timeout','$scope','toastr'];

  function ResourceDetailController ($state,$stateParams, Resource,entity,$q,$timeout,$scope,toastr) {
    var vm = this;
    vm.saveOrUpdate = saveOrUpdate;
    vm.load = load;
    vm.resource=entity;
    vm.load();

    function load () {
      if(vm.resource.resourceId!=undefined&& vm.resource.resourceId!=null&& vm.resource.resourceId!=''){
        Resource.query().get(vm.resource,
          function(result){
            vm.resource = result.rows[0];
          },
          function(error){
          }
        );
      }
    }
    function saveOrUpdate () {
      console.log(vm.resource);
      Resource.save().saveOrUpdate(vm.resource, onSuccess,onError);
    }
    function onSuccess(data, headers) {
      toastr.success('保存成功！','信息提示');
      $state.go('resource');
    }
    function onError(error) {
      console.log('error');
    }
  }
})();
