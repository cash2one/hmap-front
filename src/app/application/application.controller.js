/**
 * Created by Administrator on 2016/9/7.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('ApplicationController', ApplicationController);

  ApplicationController.$inject = ['$state','Application',  'entity','paginationConstants'];

  function ApplicationController($state, Application, entity, paginationConstants) {
    var vm = this;
    vm.token = null;

    Application.getToken1().then(function(data) {
      vm.token = data;
      ////console.log("000000" + vm.token);
      Application.getList(vm.token).then(function(data) {
        ////console.log("000000" + angular.toJson(data,true));
        ////console.log("000000" + typeof data);
        vm.application = data;
      })
    })



  }

})();
