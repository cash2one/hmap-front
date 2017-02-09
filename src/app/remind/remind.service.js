(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Remind', Remind);

  Remind.$inject = ['$http','$resource','Upload','BaseConfig','$localStorage','$sessionStorage'];

  function Remind ($http,$resource,Upload,BaseConfig,$localStorage,$sessionStorage) {
    var service = {
      remindLoadSearch: remindLoadSearch,
      remindUpdate: remindUpdate,
    };
    return service;

    function remindLoadSearch(page,pageSize) {
      return $resource("/api/remindFound?page="+page+"&pageSize="+pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function remindUpdate() {
      return $resource("/api/remindUpdate", {}, {
        'update': {method: 'POST'}
      });
    }
  }
})();
