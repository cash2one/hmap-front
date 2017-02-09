(function () {
  'use strict';

  angular
    .module('hmapFront')
    .factory('Principal', Principal);

  Principal.$inject = ['$q', 'Account', '$localStorage', 'Authority'];

  function Principal($q, Account, $localStorage, Authority) {
    var _identity,
      _authority,
      _authenticated = false,
      _authorized = false;

    var service = {
      authenticate: authenticate,
      authorization: authorization,
      hasAnyAuthority: hasAnyAuthority,
      hasAuthority: hasAuthority,
      identity: identity,
      isAuthenticated: isAuthenticated,
      isIdentityResolved: isIdentityResolved
    };

    return service;

    function authenticate(identity) {
      _identity = identity;
      _authenticated = identity !== null;
    }

    function hasAnyAuthority(authorities) {
      if (!_authenticated || !_identity || !_identity.authorities) {
        return false;
      }

      for (var i = 0; i < authorities.length; i++) {
        if (_identity.authorities.indexOf(authorities[i]) !== -1) {
          return true;
        }
      }

      return false;
    }

    function hasAuthority(authority) {
      if (!_authenticated) {
        return $q.when(false);
      }

      return this.identity().then(function (_id) {
        return _id.authorities && _id.authorities.indexOf(authority) !== -1;
      }, function () {
        return false;
      });
    }


    function identity(force) {
      //console.log('identity');
      var deferred = $q.defer();

      if (force === true) {
        _identity = undefined;
      }

      // check and see if we have retrieved the identity data from the server.
      // if we have, reuse it by immediately resolving

      if (angular.isDefined(_identity)) {
        _authenticated = true;
        deferred.resolve(_identity);
        return deferred.promise;
      }

      ////console.log($localStorage.authenticationToken);
      // retrieve the identity data from the server, update the identity object, and then resolve.
      ////console.log('Account then');
      Account.get().$promise
        .then(getAccountThen)
        .catch(getAccountCatch);

      return deferred.promise;

      function getAccountThen(account) {
        _identity = account.data;
        _authenticated = true;
        deferred.resolve(_identity);
      }

      function getAccountCatch(reason) {
        //console.log('reason');
        //console.log(reason);
        _identity = null;
        _authenticated = false;
        deferred.resolve(_identity);
      }
    }

    function authorization(url) {
      var deferred = $q.defer();
      var resource = {
        url: '#/' + url
      };

      Authority.validateUrl().query(resource).$promise.then(getUrlAuthorityThen).catch(getAccountCatch);
      return deferred.promise;

      function getUrlAuthorityThen(data) {
        _authority = data.rows[0];
        _authorized = true;
        deferred.resolve(_authority);
      }

      function getAccountCatch(reason) {
        _identity = null;
        _authorized = false;
        deferred.resolve(_authority);
      }
    }

    function isAuthenticated() {
      return _authenticated;
    }

    function isIdentityResolved() {
      return angular.isDefined(_identity);
    }
  }
})();