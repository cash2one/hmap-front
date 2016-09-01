(function() {
    'use strict';

    angular
        .module('hmapFront')
        .config(paginationConfig);

    paginationConfig.$inject = ['uibPaginationConfig', 'paginationConstants'];

    function paginationConfig(uibPaginationConfig, paginationConstants) {
        uibPaginationConfig.itemsPerPage = paginationConstants.itemsPerPage;
        uibPaginationConfig.maxSize = 5;
        uibPaginationConfig.boundaryLinks = true;
        uibPaginationConfig.firstText = '首页';
        uibPaginationConfig.previousText = '上一页';
        uibPaginationConfig.nextText = '下一页';
        uibPaginationConfig.lastText = '末页';
    }
})();
