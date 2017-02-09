/**
 * Created by zhouzy on 2016/11/10 0010.
 */
(function () {
  'use strict';

  angular.module('hmapFront')
    .factory('Contacts', Contacts);

  Contacts.$inject = ['$resource'];

  function Contacts($resource) {
    var newTag = {};
    var service = {
      findAllDepts: findAllDepts,
      findDeptStaff:findDeptStaff,
      createOrUpdateTag:createOrUpdate,
      contactListSearch:contactListSearch,
      getAllTags:getAllTags,
      unlockTag:unlockTag,
      deleteTag:deleteTag
    };
    return service;

    function findAllDepts() {
      var resourceUrl = '/api/dept/getAllDept';
      return $resource(resourceUrl, {}, {
        'query': {method: 'GET'}
      });
    }
    function findDeptStaff() {
      var resourceUrl = '/api/dept/getDeptStaff';
      return $resource(resourceUrl, {}, {
        'get': {method: 'POST'}
      });
    }
    function createOrUpdate(){
      var resourceUrl = '/api/contactTag/createOrUpdate';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
    function getAllTags(){
      var resourceUrl = '/api/contactTag/getAllTags';
      return $resource(resourceUrl, {}, {
        'get': {method: 'GET'}
      });
    }

    function unlockTag(){
      var resourceUrl = '/api/contactTag/unlock';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
    function deleteTag(){
      var resourceUrl = '/api/contactTag/delete';
      return $resource(resourceUrl, {}, {
        'save': {method: 'POST'}
      });
    }
    function contactListSearch(){
      var resourceUrl = '/api/contactList/search';
      return $resource(resourceUrl, {}, {
        'search': {method: 'POST'}
      });
    }
  }

})();
