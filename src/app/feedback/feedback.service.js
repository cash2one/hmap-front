/**
 * Created by hand on 2016/11/6.
 */
(function () {
  'use strict';
  angular
    .module('hmapFront')
    .factory('Feedback', Feedback);

  Feedback.$inject = ['$resource','$localStorage'];

  function Feedback($resource,$localStorage) {
    var service = {
      query: query,
      insert:insert,
      queryNotReply:queryNotReply,
      printFeedback:printFeedback,
      createFeedback:createFeedback
    };
    return service;

    function query() {
      var resourceUrl = '/api/feedquery';
      return $resource(resourceUrl, {}, {
        'query': {method: 'POST'}
      });
    }

    function insert(){
      var resourceUrl = '/api/insertReply';
      return $resource(resourceUrl,{},{
        'insert':{method:'POST'}
      })
    }

    function queryNotReply(){
      var resourceUrl='/api/queryNotReply';
      return $resource(resourceUrl,{},{
        'query':{method:'GET'}
      })
    }

    function printFeedback(){
      var resourceUrl='/api/printFeedback';
      return $resource(resourceUrl,{},{
        'print':{method:'POST'}
      })
    }

    function createFeedback(){
      var resourceUrl='/api/createFeedback';
      return $resource(resourceUrl,{},{
        'insert':{method:'POST'}
      })
    }
  }
})();
