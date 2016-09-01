/**
 * Created by user on 2016/8/8.
 */
(function () {
    'use strict';

    angular.module('hmapFront')
        .config(routerConfig);

    function routerConfig($stateProvider) {
        $stateProvider
            .state('editLine', {
                parent: 'app',
                url: "/editLine/{lineId}",
                views: {
                    'body': {
                        templateUrl: "app/interfaceManage/editLine/editLine.html",
                        controller: 'EditLineController',
                        controllerAs: 'vm'
                    }
                },
                resolve: {
                    entity: ['$stateParams',
                        function ($stateParams) {
                            console.log("0000="+$stateParams.lineId)
                            return {
                                lineId:$stateParams.lineId
                                //headerId:$stateParams.headerId
                            };
                        }
                    ]
                }

            });
    }

})();
