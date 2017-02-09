/**
 * Created by zhouzy on 2016/11/28 0028.
 */
(function () {
  'use strict';

  angular
    .module('hmapFront')
    .config(chartConfig);

  chartConfig.$inject = ['ChartJsProvider'];

  function chartConfig(ChartJsProvider) {
    ChartJsProvider.setOptions({
      colors: ['#45b7cd', '#ff6384'],
      legend: {
        display: true,
        position:'top',
        fullWidth:true,
        labels: {
          fontColor: '#000000'
        }
      }
    });
  }
})();
