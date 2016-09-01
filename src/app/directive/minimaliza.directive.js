/**
 * Created by zhouzy on 2016/8/4 0004.
 */
(function () {
  'use strict';


  var minimaliza = {
    //restrict: 'A',
    template: '<span><a class="navbar-minimalize minimalize-styl-2 btn btn-primary " href="" ng-click="$ctrl.minimalize()"><i class="fa fa-bars"></i></a></span>',
    controller: MinimalizaController
  }

  angular
    .module('hmapFront')
    .component('minimaliza', minimaliza);

  MinimalizaController.$inject = ['$scope', '$element']
  function MinimalizaController($scope, $element) {
    var vm = this;
    vm.minimalize = minimalize;

    function minimalize() {
      $("body").toggleClass("mini-navbar");
      if (!$('body').hasClass('mini-navbar') || $('body').hasClass('body-small')) {
        // Hide menu in order to smoothly turn on when maximize menu
        $('#side-menu').hide();
        // For smoothly turn on menu
        setTimeout(
          function () {
            $('#side-menu').fadeIn(400);
          }, 200);
      } else if ($('body').hasClass('fixed-sidebar')) {
        $('#side-menu').hide();
        setTimeout(
          function () {
            $('#side-menu').fadeIn(400);
          }, 100);
      } else {
        // Remove all inline style from jquery fadeIn function to reset menu state
        $('#side-menu').removeAttr('style');
      }
    }
  }
})();
