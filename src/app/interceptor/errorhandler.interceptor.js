(function() {
    'use strict';

    angular
        .module('hmapFront')
        .factory('errorHandlerInterceptor', errorHandlerInterceptor);

    errorHandlerInterceptor.$inject = ['$q', '$rootScope','BaseConfig'];

    function errorHandlerInterceptor ($q, $rootScope,BaseConfig) {
        var service = {
          response: responseError
        };

        return service;

        function responseError (response) {
          var config=response.config
          var responseUrl=config.url;
          for (var i = 0; i < BaseConfig.backUrls.length; i++) {
            var apiUrlPrefix=BaseConfig.url + BaseConfig.backUrls[i];
            if (responseUrl.substr(0,apiUrlPrefix.length)==apiUrlPrefix) {
              console.log('is an api invoke');
              console.log(response.data.success);
              if(response.status ===200&&response.data!=undefined&&response.data.success==false){
                console.log('broadcast an error');
                $rootScope.$emit('hmapFront.httpError', response);
                return $q.reject(response);
              }
            }
          }
          return response;
        }
    }
})();
