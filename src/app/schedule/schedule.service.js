(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Schedule', Schedule);

  Schedule.$inject = ['$http','$resource','Upload','BaseConfig','$localStorage','$sessionStorage'];

  function Schedule ($http,$resource,Upload,BaseConfig,$localStorage,$sessionStorage) {
    var service = {
      scheduleLoadSearch: scheduleLoadSearch,
      scheduleUpdate: scheduleUpdate
    };
    return service;

    function scheduleLoadSearch(page,pageSize) {
      return $resource("/api/scheduleFound?page="+page+"&pageSize="+pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function scheduleUpdate() {
      return $resource("/api/scheduleUpdate", {}, {
        'update': {method: 'POST'}
      });
    }
  }
})();
