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
      .state('interfaceAuthIndex', {
        parent: 'app',
        url: "/interfaceAuthIndex/:headerId/:lineId",
        views: {
          'body': {
            templateUrl: "app/interfaceAuth/interfaceAuthIndex.html",
            controller: 'InterfaceAuthIndexController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              console.log("0000="+$stateParams.headerId);
              console.log("0000="+$stateParams.lineId);
              return {
                headerId:$stateParams.headerId,
                lineId:$stateParams.lineId
              };
            }
          ]
        }
      })
      .state('interfaceAuthIndex.add', {
        parent: 'interfaceAuthIndex',
        url: '/add',
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          console.log("$uibModal:" + $uibModal);
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
                  headerId: $stateParams.headerId,
                  lineId: $stateParams.lineId,
                  authId: null
                };
              }
            }
          }).result.then(function () {
              console.log("interfaceAuthIndex go1");
              $state.go('interfaceAuthIndex', null, {reload: true});
            }, function () {
              console.log("interfaceAuthIndex go2");
              $state.go('interfaceAuthIndex');
            });
        }]
      })
  }
})();
