/**
 * Created by zhouzy on 2016/7/3 0003.
 */
(function() {
  'use strict';

  angular
    .module('hmapFront')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$rootScope', '$state', '$timeout', 'Auth','BaseConfig'];
  /** @ngInject */
  function LoginController($rootScope, $state, $timeout,Auth,BaseConfig) {
    var vm = this;
    vm.login = login;
    vm.changeImg=changeImg;
    vm.username = "";
    vm.password = "";
    vm.verifiCode = "";
    vm.verifiCodeUrl=BaseConfig.url+"/verifiCode";


    function login (event) {
      event.preventDefault();
      Auth.login({
        username: vm.username,
        password: vm.password,
        captcha:vm.captcha
      }).then(function () {
        //console.log("login");
        vm.authenticationError = false;
        $state.go('main');

        //if ($state.current.name === 'register' || $state.current.name === 'activate' ||
        //  $state.current.name === 'finishReset' || $state.current.name === 'requestReset') {
        //  $state.go('app.main');
        //}

        $rootScope.$broadcast('authenticationSuccess');

        // previousState was set in the authExpiredInterceptor before being redirected to login modal.
        // since login is succesful, go to stored previousState and clear previousState
        //if (Auth.getPreviousState()) {
        //  var previousState = Auth.getPreviousState();
        //  Auth.resetPreviousState();
        //  $state.go(previousState.name, previousState.params);
        //}
      }).catch(function () {
        vm.authenticationError = true;
      });
    }

    function changeImg(){
      //console.log("changeImg");
    }
  }
})();
