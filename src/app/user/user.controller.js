(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('UserController', UserController);
  UserController.$inject = ['$scope','$state','User','paginationConstants'];
  /** @ngInject */
  function UserController( $scope,$state, User, paginationConstants) {
    var vm = this;
    $scope.num=0;
    vm.page = 1;
    vm.totalItems = null;
    vm.loadAll = loadAll;
    vm.transition = transition;
    vm.pageChanged=pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.foundByName="";
    vm.loadAll();

    $scope.loadByName = function(){
      User.get({
        id:vm.foundByName
      }, onSuccess, onError);
    }
    function loadAll() {
      User.query({
        page: vm.page,
        pagesize: paginationConstants.itemsPerPage
      }, onSuccess, onError);
    }
    function onSuccess(data, headers) {
      console.log('onSuccess');
      console.log(data);
      vm.users = data.rows;
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
  }
})();
