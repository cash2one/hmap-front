/**
 * Created by user on 2016/8/9.
 */

(function () {
  'use strict';

  angular.module('hmapFront')
    .config(routerConfig);

  function routerConfig($stateProvider) {
    $stateProvider
      .state('coding', {
        parent: 'app',
        url: "/coding",
        views: {
          'body': {
            templateUrl: "app/fastCoding/coding/coding.html",
            controller: 'CodingController',
            controllerAs: 'vm'
          }
        }

      }).state('coding.edit', {
        parent: 'coding',
        url: "/coding/edit/:codeId",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/fastCoding/coding/editCoding.html',
            controller: 'EditCodingController',
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
              console.log("coding go1");
              $state.go('coding', null, {reload: true});
            }, function () {
              console.log("coding go2");
              $state.go('coding');
            });
        }]
      }).state('coding.add', {
        parent: 'coding',
        url: "/coding/add",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/fastCoding/coding/addCoding.html',
            controller: 'AddCodingController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg'
          }).result.then(function () {
              console.log("coding go1");
              $state.go('coding', null, {reload: true});
            }, function () {
              console.log("coding go2");
              $state.go('coding');
            });
        }]
      });


  }
})();
