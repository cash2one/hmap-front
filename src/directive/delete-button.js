/**
 * Created by zhouzy on 2016/8/31 0031.
 */
(function () {
  'use strict';

  var deleteButton = {
    template: '<button type="button" class="btn btn-primary" ng-click="$ctrl.openModal()">' +
    '<span class="glyphicon glyphicon-trash"></span>&nbsp;<span> 删除111</span>' +
    '</button>',
    bindings: {
      confirmMessage: '<',//单向绑定
      confirm: '&'
    },
    //replace:true,
    //transclude: true,
    controller: DeleteButtonController,
  };

  angular
    .module('hmapFront')
    .component('deleteButton', deleteButton);

  DeleteButtonController.$inject = ['$scope', '$uibModal'];
  function DeleteButtonController($scope,$uibModal) {
    var $ctrl = this;

    $ctrl.openModal = function(){
      //console.log($ctrl);
      $ctrl.modalInstance = $uibModal.open({
        template: '<confirm-modal></confirm-modal>',
        appendTo : angular.element(document).find('delete-button')
      });
    }
  }
})();
