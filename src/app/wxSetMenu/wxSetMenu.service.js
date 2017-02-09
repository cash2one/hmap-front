(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('WxSetMenu', WxSetMenu);

  WxSetMenu.$inject = ['$resource','BaseConfig','$sessionStorage'];

  function WxSetMenu ($resource,BaseConfig,$sessionStorage) {
    var service = {
      wxMenuLoadSearch: wxMenuLoadSearch,
      wxMenuUpdate: wxMenuUpdate,
      wxMenuSave: wxMenuSave,
      wxSetMenu:wxSetMenu,
      wxMenuLoadMenu:wxMenuLoadMenu
    };
    return service;

    function wxMenuLoadSearch(page,pageSize) {
      return $resource("/api/wxMenuFound?page="+page+"&pageSize="+pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function wxMenuUpdate() {
      return $resource("/api/wxMenuUpdate", {}, {
        'update': {method: 'POST'}
      });
    }
    function wxMenuSave() {
      return $resource("/api/wxMenuSave", {}, {
        'save': {method: 'POST'}
      });
    }
    function wxSetMenu() {
      return $resource("/api/wxSetMenu", {}, {
        'update': {method: 'POST'}
      });
    }
    function wxMenuLoadMenu() {
      return $resource("/api/wxSelectAllMenu", {}, {
        'query': {method: 'POST'}
      });
    }
  }
})();
