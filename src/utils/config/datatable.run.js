(function() {
  'use strict';

  angular
    .module('hmapFront')
    .run(runBlock);

  /** @ngInject */
  function runBlock(DTDefaultOptions) {

    DTDefaultOptions.setOption('serverSide', true);
    DTDefaultOptions .setLanguage({
        "sEmptyTable":     "表中无数据",
        "sInfo":           "显示 _START_ - _END_ 条 共 _TOTAL_ 条记录",
        "sInfoEmpty":      "显示 0 - 0 条 总共 0 条",
        "sInfoFiltered":   "(数据表中共为 _MAX_ 条记录)",
        "sInfoPostFix":    "",
        "sInfoThousands":  ",",
        "sLengthMenu":     "每页显示 _MENU_ 条",
        "sLoadingRecords": "正在加载中...",
        "sProcessing":     "正在加载中...",
        "sSearch":         "搜索:",
        "sZeroRecords":    "对不起，查询不到任何相关数据",
        "oPaginate": {
          "sFirst":    "首页",
          "sLast":     "末页",
          "sNext":     "下一页",
          "sPrevious": "上一页"
        },
        "oAria": {
          "sSortAscending":  ": activate to sort column ascending",
          "sSortDescending": ": activate to sort column descending"
        }
      });
    DTDefaultOptions .setOption('autoWidth',true);
    DTDefaultOptions .setOption('processing', true);
    DTDefaultOptions .setOption('serverSide', true);
    DTDefaultOptions .setOption('scrollY', '500px');
    DTDefaultOptions .setOption('scrollX', '100%');
    DTDefaultOptions .setOption('scrollCollapse', true);
    DTDefaultOptions .setOption('paging', true);
    DTDefaultOptions .setOption('ordering', true);
    DTDefaultOptions .setOption('searching', true);
    DTDefaultOptions.setDisplayLength(10)

  }

})();
