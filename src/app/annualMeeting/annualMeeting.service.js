(function() {
  'use strict';
  angular
    .module('hmapFront')
    .factory('AnnualMeeting', AnnualMeeting);

  AnnualMeeting.$inject = ['$resource'];

  function AnnualMeeting ($resource) {
    var service = {
      meetingLoadSearch: meetingLoadSearch,
      staffLoadSearch: staffLoadSearch,
      meetingUpdate: meetingUpdate,
      getMeeting:getMeeting,
      getSeats:getSeats,
      buildTable:buildTable,
      buildTables:buildTables,
      saveTable:saveTable,
      generateUUID:generateUUID,
      loadTables:loadTables,
      changeTable:changeTable
    };
    return service;
    function loadTables() {
      return $resource("/api/tableFound/:id", {}, {
        'query': {method: 'GET'}
      });
    }
    function changeTable() {
      return $resource("/api/changeTable", {}, {
        'save': {method: 'POST'}
      });
    }
    function meetingLoadSearch(page,pageSize) {
      return $resource("/api/meetingFound?page="+page+"&pageSize="+pageSize, {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function staffLoadSearch() {
      return $resource("/api/staffFound", {}, {
        'query': {method: 'POST', isArray: false}
      });
    }
    function meetingUpdate() {
      return $resource("/api/meetingUpdate", {}, {
        'save': {method: 'POST'}
      });
    }
    function buildTables() {
      return $resource("/api/buildTables", {}, {
        'save': {method: 'POST'}
      });
    }
    function buildTable() {
      var resourceUrl = '/api/buildTable';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
    function getMeeting() {
      var resourceUrl = '/api/getMeeting/:id';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }
    function getSeats() {
      var resourceUrl = '/api/getSeats/:id';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET',isArray: false}
      });
    }
    function saveTable() {
      var resourceUrl = '/api/saveTable';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }
    function generateUUID() {
      var date = new Date().getTime();
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (date + Math.random() * 16) % 16 | 0;
        date = Math.floor(date / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
      });
      return uuid;
    };
  }
})();
