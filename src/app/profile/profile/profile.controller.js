(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['$state','Profile','paginationConstants'];

  function ProfileController($state, Profile, paginationConstants) {
    var vm = this;

    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.pageChanged=pageChanged;
    vm.transition = transition;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.loadAll();


    function loadAll() {
      Profile.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      //console.log('onSuccess');
      //console.log(data);
      vm.profiles = data.rows;
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
