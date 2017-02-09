/**
 * Created by xinming on 2016/9/29.
 */
(function() {
  'use strict';
  var lookupSelect = {
    template: '<select class="form-control" ng-model="vm.lookupValue" ng-click="vm.change()" ng-options="codeValue.value as codeValue.meaning for codeValue in vm.codeValues"></select>',
    controller: LookupSelectController,
    controllerAs: 'vm',
    replace: true,
    bindings: {
      lookupType: '@',
      lookupValue:'=',
      onChange:"&"
    }
  };

  angular
    .module('hmapFront')
    .component('lookupSelect', lookupSelect);
  LookupSelectController.$inject = ['CodingValueService','CodingService','$q'];

  function LookupSelectController(CodingValueService,CodingService,$q) {
    var vm = this;
    vm.change=change;
    this.$onInit = function () {
      var deferred = $q.defer();
      CodingService.findCodes({code:vm.lookupType}, 1, 1)
        .then(function (data) {
          vm.code = data.rows[0];
          deferred.resolve();
        },function(){
          deferred.reject ()
        });
      deferred.promise.then(function(){
        //蛋疼的后台这个地方如果传vm.code对象过去就查不到信息，所以加个临时的对象吧
        CodingValueService.findCodeValuesByCodeValue({codeId:vm.code.codeId})
          .then(function (data) {
            vm.codeValues = data.rows;
          })
      },function(){
        //console.log("reject")
      })

    }

    function change(){
      vm.onChange();
    }
  }
})();
