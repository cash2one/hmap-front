/**
 * Created by zhouzy on 2016/9/4 0004.
 */
(function () {
  'use strict';

  var navigation = {
    template: '<ul class="nav nav-second-level" aria-expanded="true"><li  ng-repeat="item in $ctrl.menu" ng-if="item.ischecked==true"><a ng-href="{{item.url}}" aria-expanded="true">{{item.text}}<span class="fa arrow" ng-if="item.children.length>0"></span></a><ul class="nav nav-third-level" aria-expanded="true" ng-if="item.children.length>0"><navigation menu="item.children"></navigation></li></ul>',
    bindings: {
      menu: '<'
    },
    controller: NavigationController
  };

  angular
    .module('hmapFront')
    .component('navigation', navigation);
  NavigationController.$inject = ['$scope', '$rootScope', '$log','$timeout'];

  function NavigationController($scope, $rootScope, $log,$timeout) {
    var vm = this;

    this.$onInit = function () {
      var nav = angular.element(document.querySelector('side-navigation'));
    }
    this.$postLink = function () {
      //angular.element
      var nav = angular.element(document.querySelector('side-navigation'));
      //console.log("nav $postLink");
    }
  }
})();
