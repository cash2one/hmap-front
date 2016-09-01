/**
 * Created by user on 2016/8/3.
 */
(function () {
    'use strict';

    angular.module('hmapFront')
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('line', {
                parent: 'app',
                //params: {
                //    headerId: ""
                //},
                url: "/line/{headerId}",
                views: {
                    'body': {
                        templateUrl: "app/interfaceManage/line/line.html",
                        controller: 'LineController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams',
                        function ($stateParams) {
                            return {
                                headerId:$stateParams.headerId,
                                page:null,
                                pagesize:null
                            };
                        }
                    ]
                }

            });
    };

})();
