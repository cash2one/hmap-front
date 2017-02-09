/**
 * Created by user on 2016/8/8.
 */


(function () {
  'use strict';
  angular.module('hmapFront')
    .factory('AddLineService', AddLineService);

  AddLineService.$inject = ['$http', '$resource'];

  function AddLineService($http, $resource) {

    var resourceUrl = '/api/insertLine';
    return $resource(resourceUrl, {}, {
      'query': {method: 'POST', isArray: false}
    });


  }


})();
