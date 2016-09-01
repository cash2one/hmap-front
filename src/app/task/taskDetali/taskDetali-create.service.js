(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('TaskDetaliCreate', TaskDetaliCreate);

  TaskDetaliCreate.$inject = ['$resource'];

  function TaskDetaliCreate ($resource) {
    console.log("create");
    return $resource("/api/createJob", {}, {
      'save': {method: 'POST'}
    });
  }
})();
