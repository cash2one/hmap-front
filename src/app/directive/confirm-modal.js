/**
 * Created by zhouzy on 2016/8/31 0031.
 */
/**
 * Created by zhouzy on 2016/8/30 0030.
 */
(function () {
  'use strict';
  var confirmModal = {
    templateUrl: 'app/tpl/deleteConfirmComponent.html',
    //template:function($element, $attrs) {
    //  return '<div class="modal-header"><h3 class="modal-title">删除确认</h3></div>' +
    //    '<div class="modal-body">是否确认删除选定项？</div>' +
    //    '<div class="modal-footer">' +
    //    '<button class="btn btn-primary" type="button" ng-click="$ctrl.ok()">确认</button>' +
    //    '<button class="btn btn-info" type="button" ng-click="$ctrl.cancel()"> 取消</button>' +
    //    '</div>';
    //},
    bindings: {
      //resolve: '<',
      //close: '&',
      //dismiss: '&',
      confirmMessage: '<',//单向绑定
      confirm: '&'
    },
    replace: true,
    require: {
      parent : '^deleteButton'
    },
    //,
    controller: ComfirmModalController
  };
  angular.module('hmapFront').component('confirmModal', confirmModal);

  ComfirmModalController.$inject = ['$scope'];
  function ComfirmModalController($scope) {
    var $ctrl = this;

    $ctrl.$onInit = function(){

      var instance = $ctrl.parent.modalInstance;

      $ctrl.items = ['item1', 'item2', 'item3'];

      $ctrl.selected = {
        item: $ctrl.items[0]
      };

      $ctrl.ok = function () {
        console.log($ctrl.parent.confirm());
        instance.close($ctrl.selected);
      };

      $ctrl.cancel = function () {
        instance.dismiss('cancel');
      };

      instance.result.then(function (selectedItem) {
        $ctrl.selected = selectedItem;
        console.log($ctrl.selected );
      }, function () {
        console.log('Modal dismissed at: ' + new Date());
      });
    };
  }

})();
