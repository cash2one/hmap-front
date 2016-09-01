/**
 * Created by zhouzy on 2016/8/29 0029.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ResourceDetailController', ResourceDetailController);

  ResourceDetailController.$inject = ['$state','$stateParams', 'Resource','entity'];

  function ResourceDetailController ($state,$stateParams, Resource,entity) {
    var vm = this;
    vm.saveOrUpdate = saveOrUpdate;
    vm.load = load;
    vm.resource=entity;
    vm.load();

    function load () {
      if(vm.resource.resourceId!=undefined&& vm.resource.resourceId!=null&& vm.resource.resourceId!=''){
        Resource.query().get(vm.resource, function(result) {
          vm.resource = result.rows[0];
        });
      }
    }
    function saveOrUpdate () {
      console.log(vm.resource);
      Resource.save().saveOrUpdate(vm.resource, onSuccess,onError);
    }
    function onSuccess(data, headers) {
          $state.go('resource');
    }
    function onError(error) {
      console.log('error');
    }
  }
})();
