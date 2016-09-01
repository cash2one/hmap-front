(function () {
  'use strict';

  angular
    .module('hmapFront')
    .factory('Account', Account);

  Account.$inject = ['$q', '$http'];

  function Account($q, $http) {
    console.log('get Account');
    var service = {
      getAccount: getAccount
    }

    function getAccount() {
      var deferred = $q.defer();
      $http.get('/api/account').success(function (data) {
          deferred.resolve(data);
        }).error(function (reason) {
          deferred.reject(reason);
        });
      return deferred.promise;
    }
    return service;
  }
})();
