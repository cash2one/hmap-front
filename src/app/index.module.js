(function () {
  'use strict';

  angular
    .module('hmapFront', [
      'ngAnimate',
      'ngCookies',
      'ngTouch',
      'ngSanitize',
      'ngMessages',
      'ngAria',
      'ngResource',
      'ngStorage',
      'ui.router',
      'ngCacheBuster',
      'ui.bootstrap',
      'ui.select',
      'ui.bootstrap.datetimepicker',
      'ngFileUpload',
      'ngJsTree',
      'angular-loading-bar',
      'ng.ueditor',
      'toastr',
      'datatables',
      'datatables.bootstrap',
      'as.sortable',
      'angular-ladda',
      'ng-sweet-alert',
      'chart.js'])
      //.config(function (cfpLoadingBarProvider) {cfpLoadingBarProvider.includeSpinner = true;
  .run(run);

  run.$inject = ['stateHandler'];
  function run(stateHandler) {
    stateHandler.initialize();
  }
})();
