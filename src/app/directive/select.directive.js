(function () {
  'use strict';

  var hmsSelect = {
    template: '<select class="form-control" ng-model="$ctrl.value"><option ng-repeat="option in $ctrl.options" value="{{option.value}}">{{option.value}}</option></select>',
    bindings: {
      code: '@',//单向绑定
      value: '&'
    },
    //replace:true,
    //transclude: true,
    controller: HmsSelectController,
  };

  angular
    .module('hmapFront')
    .component('hmsSelect', hmsSelect);

  HmsSelectController.$inject = ['$scope', '$rootScope', 'CodingValueService'];
  function HmsSelectController($scope, $rootScope, CodingValueService) {
    var vm = this;
    vm.options = [];
    vm.value = "";
    vm.codeEntity = {code: vm.code}
    //vm.value="xxxxxx";
    //console.log(vm);
    //console.log($scope);
    //$scope.$parent.value = vm.value;
    loadCodeValues(vm.codeEntity);
    function loadCodeValues(code) {
      CodingValueService.findCodeValues(code).then(function (data) {
        vm.options = data.rows;
      });
    }
  }
})();
