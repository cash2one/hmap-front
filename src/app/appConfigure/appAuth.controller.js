/**
 * Created by xincai.zhang on 2016/8/12.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .controller('AppConfigController', AppConfigController);

  AppConfigController.$inject = ['AppAuthService', '$scope', '$state', 'paginationConstants'];

  function AppConfigController(AppAuthService, $scope, $state, paginationConstants) {
    console.log("enter hmsAppAuth page....")
    var vm = this;
    vm.page = 1;
    vm.totalItems = null;
    vm.transition = transition;
    vm.pageChanged = pageChanged;
    vm.itemsPerPage = paginationConstants.itemsPerPage;
    vm.hmsAppAuth = null;
    var hmsAppAuth = vm.hmsAppAuth;
    var page = vm.page;
    var pagesize = paginationConstants.itemsPerPage;
    getAppAuth(hmsAppAuth,page, pagesize);

    function getAppAuth(hmsAppAuth, page, pagesize) {
      return AppAuthService.findAppAuth(hmsAppAuth, page, pagesize)
        .then(function (data) {
          vm.result = data.rows;
          vm.totalItems = data.total;
          console.log("result00000" + angular.toJson(vm.result));
        })
    }

    function transition() {
      $state.transitionTo($state.$current, {
        page: vm.page
      });
    }
    function pageChanged() {
      console.log('Page changed to: ' + vm.page);
      getAppAuth(hmsAppAuth, vm.page, pagesize);
    };
    //搜索获取model值封装成对象
    vm.vm = {
      hmsAppAuth: {
        "appName": '',
        "appType": '',
        "userName": ''
      }
    };
    vm.queryAppAuth = function () {
      var hmsAppAuth = vm.vm.hmsAppAuth;
      getAppAuth(hmsAppAuth,page, pagesize);//因为公用一个查询方法所以在搜索的时候也需要传page,pagesize
      console.log("params is:", angular.toJson(vm.vm.hmsAppAuth));
      function getAppAuth(hmsAppAuth,page, pagesize) {
        return AppAuthService.findAppAuth(hmsAppAuth,page, pagesize)
          .then(function (data) {
            vm.totalItems = null;
            vm.result = data.rows;
            vm.totalItems = data.total;
            console.log("result00000" + angular.toJson(vm.result));
          })

      }
    }
    //$scope.addLine = function (header) {
    //  $state.go("addLine", {headerId: header.headerId});
    //};

  }

})();
