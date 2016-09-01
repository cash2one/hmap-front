(function() {
    'use strict';

    var itemCount = {
        template: '<div class="info">' +
                    '显示 {{(($ctrl.page - 1) * $ctrl.itemsPerPage) == 0 ? 1 : (($ctrl.page - 1) * $ctrl.itemsPerPage + 1)}} - ' +
                    '{{($ctrl.page * $ctrl.itemsPerPage) < $ctrl.totalItems ? ($ctrl.page * $ctrl.itemsPerPage) : $ctrl.totalItems}} ' +
                    '条 总共{{$ctrl.totalItems}} 条.' +
                '</div>',
        bindings: {
            page: '<',
            totalItems: '<total',
            itemsPerPage: '<'
        }
    };

    angular
        .module('hmapFront')
        .component('itemCount', itemCount);
})();
