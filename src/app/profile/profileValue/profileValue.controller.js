/**
 * Created by Administrator on 2016/9/2.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ProfileValueController', ProfileValueController);

  ProfileValueController.$inject = ['$state','ProfileValue',  'entity','paginationConstants'];

  function ProfileValueController($state, ProfileValue, entity, paginationConstants) {
    var vm = this;

    vm.page = 1;
    vm.profileValues = entity;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.pageChanged=pageChanged;
    vm.transition = transition;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadAll();


    function loadAll() {
      //console.log(vm.profileValues.id);
      ProfileValue.query({
        profileId: vm.profileValues.id
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.profileValues = data.rows[0][0];
      vm.profiles = data.rows[0][2][0];
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
    };
  }



})();
