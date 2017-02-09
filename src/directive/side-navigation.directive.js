/**
 * Created by zhouzy on 2016/9/4 0004.
 */
/**
 * Created by zhouzy on 2016/8/4 0004.
 */
(function () {
  'use strict';

  var sideNavigation = {
    //restrict: 'A',
    //transclude:true,
    template: '' +
    '<ul class="nav metismenu" id="side-menu">' +
    ' <li ng-repeat="menu in $ctrl.menu" ng-if="menu.ischecked==true">' +
    '   <a href="" aria-expanded="true">' +
    '     <i ng-class="menu.icon"></i>' +
    '     <span class="nav-label">{{menu.text}}</span>' +
    '     <span class="fa arrow"></span>' +
    '   </a>' +
    '   <ul class="nav nav-second-level">' +
    '     <li ng-repeat="child in menu.children" class="in" ng-if="child.ischecked==true">' +
    '       <a href="{{child.url}}">{{child.text}}</a>' +
    '     </li>' +
    '   </ul>' +
    ' </li>' +
    '</ul>',
    //template: '<ul class="nav metismenu" id="side-menu"></ul>',
    controller: SideNavigationController

  };
  angular
    .module('hmapFront')
    .component('sideNavigation', sideNavigation);

  SideNavigationController.$inject = ['$scope', '$element', '$timeout', 'Authority', '$sessionStorage','Hmapfe'];
  function SideNavigationController($scope, $element, $timeout, Authority, $sessionStorage,Hmapfe) {

    var vm = this;
    vm.menu = [];
    vm.loadMenu = loadMenu;
    //vm.init=init;
    //vm.init();
    //
    //function init(){
    //  //console.log("metisMenu");
    //  $timeout(function(){
    //    $element.metisMenu();
    //  });
    //  //console.log($element);
    //}

    this.$onInit = function () {
      vm.loadMenu();
    };

    function loadMenu() {
      vm.user = {
        userId: $sessionStorage.user.userId
      };
      Authority.queryUserRoles().get({userId: $sessionStorage.user.userId}, function (data) {
          Authority.query().get({roleId: data.rows[0].roleId}, onSuccess, onError);
        }
        , function (error) {
        });
    }

    function onSuccess(data, headers) {
      vm.menu = data.rows;
      //console.log("begin deal menu-------")
      for (var i = 0; i < vm.menu.length; i++) {
        if ((vm.menu[i].ischecked == false || vm.menu[i].ischecked == null || vm.menu[i].ischecked == undefined) && vm.menu[i].children != null && vm.menu[i].children != undefined) {
          for (var j = 0; j < vm.menu[i].children.length; j++) {
            if (vm.menu[i].children[j].ischecked == true) {
              vm.menu[i].ischecked = true;
              break;
            }
          }
        }
      }
      $timeout(function () {
        $('#side-menu').metisMenu();
      }, 0);
    }

    function onError(error) {
      //console.log('error');
    }

  }
})();
