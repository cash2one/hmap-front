(function() {
    'use strict';

    angular
        .module('hmapFront')
        .config(localStorageConfig);

    localStorageConfig.$inject = ['$localStorageProvider', '$sessionStorageProvider'];

    function localStorageConfig($localStorageProvider, $sessionStorageProvider) {
        $localStorageProvider.setKeyPrefix('hmap-');
        $sessionStorageProvider.setKeyPrefix('hmap-');
    }
})();
