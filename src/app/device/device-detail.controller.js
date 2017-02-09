/**
 * Created by zhouzy on 2016/11/28 0028.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('DeviceDetailController', DeviceDetailController);
  DeviceDetailController.$inject = ['$state','Device','paginationConstants'];
  /** @ngInject */
  function DeviceDetailController($state, Device, paginationConstants) {
    var vm = this;
  }
})();
