/**
 * Created by hand on 2016/12/20.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('PerviewController', PerviewController);

  PerviewController.$inject = ['$sce','$uibModalInstance','entity'];

  function PerviewController($sce,$uibModalInstance,entity) {
    var vm = this;
    vm.perview = "";


    init();
    function init() {
       vm.perview = $sce.trustAsHtml(entity.perviews[0]);
    }

    vm.ok = function () {
      $uibModalInstance.close();
    };

    vm.cancel = function () {
      $uibModalInstance.dismiss('cancel');
    };
  }
})();
