/**
 * Created by user on 2016/8/10.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('codingValue', {
        parent: 'app',
        url: "/codingValue/{codeId}",
        views: {
          'body': {
            templateUrl: "app/fastCoding/codingValue/codingValue.html",
            controller: 'CodingValueController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              console.log("0000="+$stateParams.codeId);
              return {
                codeId:$stateParams.codeId
              };
            }
          ]
        }

      }).state('codingValue.edit', {
        parent: 'codingValue',
        url: "/codingValue/edit/:codeValueId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/fastCoding/codingValue/editCodingValue.html',
            controller: 'EditCodingValueController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                console.log("entity:"+angular.toJson($stateParams.codeValueId));
                return {
                  codeValueId:$stateParams.codeValueId
                };
              }
            }
          }).result.then(function () {
              console.log("codingValue go1");
              $state.go('codingValue', null, {reload: true});
            }, function () {
              console.log("codingValue go2");
              $state.go('codingValue');
            });
        }]
      }) .state('codingValue.add', {
        parent: 'codingValue',
        url: "/codingValue/add/:codeId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/fastCoding/codingValue/addCodingValue.html',
            controller: 'AddCodingValueController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                console.log("entity:"+angular.toJson($stateParams.codeId));
                return {
                  codeId:$stateParams.codeId
                };
              }
            }
          }).result.then(function () {
              console.log("codingValue go1");
              $state.go('codingValue', null, {reload: true});
            }, function () {
              console.log("codingValue go2");
              $state.go('codingValue');
            });
        }]
      });


  }
})();
