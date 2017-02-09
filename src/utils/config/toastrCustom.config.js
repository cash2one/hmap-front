/**
 * Created by zhouzy on 2016/11/13 0013.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(toastrCutomConfig);

  toastrCutomConfig.$inject = ['toastrConfig'];

  function toastrCutomConfig(toastrConfig) {
    toastrConfig.timeOut = 1500;
  }
})();
