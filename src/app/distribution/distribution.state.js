(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('distribution', {
        parent: 'app',
        url: "/distribution",
        views: {
          'body': {
            templateUrl: "app/distribution/distribution.html",
            controller: 'DistributionController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {};
            }
          ]
        }
      })
      .state('distribution.upload', {
        parent: 'app',
        url: '/distribution/upload',
        views: {
          'body': {
            templateUrl: 'app/distribution/distribution-upload.html',
            controller: 'DistributionUploadController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              appId: null
            };
          }
        }
      })
      .state('distribution.add', {
        parent: 'app',
        url: '/distribution/add',
        views: {
          'body': {
            templateUrl: 'app/distribution/distribution-detail.html',
            controller: 'DistributionDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              appId: null
            };
          }
        }
      })
      .state('distribution.edit', {
        parent: 'app',
        url: '/distribution/:appId',
        views: {
          'body': {
            templateUrl: 'app/distribution/distribution-detail.html',
            controller: 'DistributionDetailController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: function ($stateParams) {
            return {
              appId: $stateParams.appId
            };
          }
        }
      })
      .state('downloadApp', {
        //parent: 'app',
        url: "/downloadApp/:randomCode",
        views: {
          'content@': {
            templateUrl: "app/distribution/downloadApp.html",
            controller: 'DownloadAppController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                randomCode:$stateParams.randomCode
              };
            }
          ]
        }
      })
      .state('viewApp', {
        parent: 'app',
        url: "/viewApp/{appId}",
        views: {
          'body': {
            templateUrl: "app/distribution/viewApp.html",
            controller: 'ViewAppController',
            controllerAs: 'vm'
          }
        },
        resolve: {
          entity: ['$stateParams',
            function ($stateParams) {
              return {
                appId: $stateParams.appId
              };
            }
          ]
        }
      })
      .state('viewApp.addAppVersion', {
        parent: 'viewApp',
        url: '/addAppVersion',
        onEnter: ['$stateParams', '$state', '$uibModal', function ($stateParams, $state, $uibModal) {
          console.log("$uibModal:" + $uibModal);
          $uibModal.open({
            templateUrl: 'app/distribution/addAppVersion.html',
            controller: 'AddAppVersionController',
            controllerAs: 'vm',
            backdrop: 'static',
            size: 'lg',
            resolve: {
              entity: function () {
                return {
                  appId: $stateParams.appId
                };
              }
            }
          }).result.then(function () {
              console.log("viewApp go1");
              $state.go('viewApp', null, {reload: true});
            }, function () {
              console.log("viewApp go2");
              $state.go('viewApp');
            });
        }]
      })
  }
})();
