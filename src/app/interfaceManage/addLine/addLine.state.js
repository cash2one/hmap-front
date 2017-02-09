/**
 * Created by user on 2016/8/8.
 */
(function () {
    'use strict';

    angular.module('hmapFront')
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('addLine', {
                parent: 'app',
                url: "/addLine/{headerId}",
                views: {
                    'body': {
                        templateUrl: "app/interfaceManage/addLine/addLine.html",
                        controller: 'AddLineController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams',
                        function ($stateParams) {
                            //console.log("0000="+$stateParams.headerId)
                            return {
                                headerId:$stateParams.headerId
                            };
                        }
                    ]
                }

            });
    }

})();
