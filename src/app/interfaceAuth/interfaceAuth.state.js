/**
 * Created by Koma.Tshu on 2016/8/25.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);
  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('interfaceAuth', {
        parent: 'app',
        url: "/interfaceAuth/:headerId/:lineId",
        views: {
          'body': {
            templateUrl: "app/interfaceAuth/interfaceAuth.html",
            controller: 'InterfaceAuthController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                interfaceHeaderId:$stateParams.headerId,
                interfaceLineId:$stateParams.lineId
              };
            }
          ]
        }
      })
      .state('interfaceAuth.add', {
        parent: 'interfaceAuth',
        url: '/add',
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log("$uibModal:" + $uibModal);
          $uibModal.open({
            templateUrl: 'app/interfaceAuth/interfaceAuth-dialog.html',
            controller: 'InterfaceAuthDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  interfaceAuthId: null,
                  interfaceHeaderId: $stateParams.headerId,
                  interfaceLineId: $stateParams.lineId,
                  authId: null
                };
              }
            }
          }).result.then(function () {
              //console.log("interfaceAuthIndex go1");
              $state.go('interfaceAuth', null, {reload: true});
            }, function () {
              //console.log("interfaceAuthIndex go2");
              $state.go('interfaceAuth');
            });
        }]
      })
  }
})();
