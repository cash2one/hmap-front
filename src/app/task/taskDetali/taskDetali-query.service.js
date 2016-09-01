(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetaliFound', TaskDetaliFound);

  TaskDetaliFound.$inject = ['$resource'];

  function TaskDetaliFound ($resource) {
    return $resource("/api/foundJob", {}, {
      'query': {method: 'POST', isArray: false}
    });
  }
})();
