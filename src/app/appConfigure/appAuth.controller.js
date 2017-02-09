/**
 * Created by xincai.zhang on 2016/8/12.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AppConfigController', AppConfigController);

  AppConfigController.$inject = ['AppAuthService','$scope', '$state', 'paginationConstants'];

  function AppConfigController(AppAuthService,$scope, $state, paginationConstants) {
    ////console.log("enter hmsAppAuth page....")
    var vm = this;
    vm.searchApp={};
    vm.page = 1;
    vm.totalItems = null;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.hmsAppAuth = null;
    vm.uploadPic="assets/images/upload.png";
    var hmsAppAuth = vm.hmsAppAuth;
    var page = vm.page;
    var pagesize = paginationConstants.itemsPerPage;

    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.queryAppAuth = queryAppAuth;

    loadAll(hmsAppAuth, page, pagesize);

    function loadAll(hmsAppAuth, page, pagesize) {
      vm.searchApp.page = vm.page;
      vm.searchApp.pagesize = paginationConstants.itemsPerPage;
      AppAuthService.findAppAuth().query(vm.searchApp, onSuccess, onError);
    }

    function onSuccess(data, headers) {
      vm.result = data.rows;
      vm.totalItems = data.total;
    }

    function onError(error) {
      console.log('error');
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }

    function pageChanged() {
      ////console.log('Page changed to: ' + vm.page);
      loadAll(hmsAppAuth, vm.page, pagesize);
    };


    //搜索获取model值封装成对象
    vm.hmsAppAuth = {
      "appName": '',
      "appType":'',
      "userName": '',
      "appAuzMode":'',
    };



    function queryAppAuth() {
      var hmsAppAuth = vm.hmsAppAuth;
      loadAll(hmsAppAuth, page, pagesize);//因为公用一个查询方法所以在搜索的时候也需要传page,pagesize
      ////console.log("params is:", angular.toJson(vm.hmsAppAuth));
    }

  }
})();
