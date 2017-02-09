(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider,$httpProvider) {
    $stateProvider
      .state('app', {
        abstract: true,
        url: "/app",
        views:{
          'content@':{
            templateUrl: 'app/layouts/content.html'
          },
          'navigation@app':{
            templateUrl: 'app/layouts/leftnavbar/leftnavbar.html',
            controller: 'LeftnavbarController',
            controllerAs: 'vm',
          },
          'topnavbar@app':{
            templateUrl: 'app/layouts/topnavbar/topnavbar.html',
            controller: 'TopnavbarController',
            controllerAs: 'vm',
          },
          'footer@app':{
            templateUrl: 'app/layouts/footer.html'
          }
        },
        resolve: {
          authorize: ['Auth',
            function (Auth) {
              return Auth.authorize();
            }
          ]
        }
      });

    $urlRouterProvider.otherwise('/login');
    //$httpProvider.defaults.withCredentials = true;
    $httpProvider.defaults.useXDomain = true;
  }
})();
