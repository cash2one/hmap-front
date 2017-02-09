/**
 * Created by hand on 2016/12/22.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('ContentService', ContentService);

  ContentService.$inject = ['$resource','$localStorage'];

  function ContentService($resource,$localStorage) {
    var service = {
      query: query,
    };
    return service;

    function query() {
      var resourceUrl = '/api/content/query';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }
  }
})();
