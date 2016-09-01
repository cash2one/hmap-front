(function() {
  'use strict';

  angular
    .module('hmapFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
