(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('modifyPwdService', modifyPwdService);

  modifyPwdService.$inject = ['$resource','$http'];

  function modifyPwdService($resource,$http) {
    var service = {
      modifyPwd:modifyPwd
    };
    return service;

    function modifyPwd(){
      var resourceUrl ='/api/modifyPwd/modifyPwdSimple';
      return $resource(resourceUrl,{}, {
        'query': {method: 'POST'}
      })
    }
  }
})();
