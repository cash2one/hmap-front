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

            })
          .state('line.edit', {
            parent: 'app',
            url: "/line/edit/{lineId}",
            views: {
              'body': {
                templateUrl: "app/interfaceManage/line/line-detail.html",
                controller: 'LineDetailController',
                controllerAs: 'vm'
              }
            },
            resolve: {
              entity: ['$stateParams',
                function ($stateParams) {
                  //console.log("0000="+$stateParams.lineId)
                  return {
                    lineId:$stateParams.lineId
                    //headerId:$stateParams.headerId
                  };
                }
              ]
            }

          }).state('line.new', {
            parent: 'app',
            url: "/line/new/{headerId}",
            views: {
              'body': {
                templateUrl: "app/interfaceManage/line/line-detail.html",
                controller: 'LineDetailController',
                controllerAs: 'vm'
              }
            },
            resolve: {
              entity: ['$stateParams',
                function ($stateParams) {
                  return {
                    headerId:$stateParams.headerId
                  };
                }
              ]
            }

          });
    };

})();
