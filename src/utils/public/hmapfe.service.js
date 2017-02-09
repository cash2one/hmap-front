/**
 * Created by zhouzy on 2016/11/10 0010.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('Hmapfe', Hmapfe);

  Hmapfe.$inject = ['BaseConfig'];

  function Hmapfe(BaseConfig) {
    var service = {
    log:log
    };
    return service;

    function log(msg){
      if(BaseConfig.debugEnable){
        console.log(msg);
      }
    }
  }

})();
