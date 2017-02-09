/**
 * Created by zhouzy on 2016/11/10 0010.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('contacts', {
        parent: 'app',
        url: "/contacts",
        views: {
          'body': {
            templateUrl: "app/contacts/contacts.html",
            controller: 'ContactsController',
            controllerAs: 'vm'
          }
        }
      })
      .state('contacts.tag', {
        parent: 'contacts',
        url: "/tag",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          $uibModal.open({
            templateUrl: 'app/contacts/tag-dialog.html',
            controller: 'TagDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  tagName: null
                };
              }
            }
          }).result.then(function () {
              //$state.go('contacts', null, {reload: true});
              console.log("contacts.detail1");
            }, function () {
              //$state.go('contacts');
              console.log("contacts.detail2");
            });
        }]
      })
      .state('contacts.new', {
        parent: 'contacts',
        url: "/new",
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          //console.log($uibModal);
          $uibModal.open({
            templateUrl: 'app/sysConfig/sysConfig-dialog.html',
            controller: 'SysConfigDialogController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  id: null,
                  configKey: null,
                  configValue: null,
                  configLevel: null,
                  enable: 'Y',
                  configDesc: null
                };
              }
            }
          }).result.then(function () {
              $state.go('contacts', null, {reload: true});
            }, function () {
              $state.go('contacts');
            });
        }]
      });
  }
})();
