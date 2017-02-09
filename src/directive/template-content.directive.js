
(function() {
  'use strict';
  var templateContent = {
    template: '',
    controller: TemplateContentController,
    controllerAs: 'vm',
    bindings: {
      content: '@',
      contentVar:'='
    }
  };

  angular
    .module('hmapFront')
    .component('templateContent', templateContent);
  TemplateContentController.$inject = ['$compile','$scope','$element','$attrs','$sce','$q'];

  function TemplateContentController($compile,$scope,$element,$attrs,$sce,$q) {
    var vm = this;

    this.$onInit = function () {
      $attrs.$observe('content', function (value) {
        if(value!=undefined && value!=''){
          var regS = new RegExp("\\$\\{[A-Za-z]+\\}","g");
          var arr=value.match(regS);
          var result=value;
          for(var i=0,_length=arr.length;i<_length;i++){
            var _var=arr[i].replace("${","").replace("}","");
            result=result.replace(arr[i],"<input type='text' style='width: 60px;border: 1px solid #b7afaf' ng-model='vm.contentVar."+_var+"'/>");
          }
          var ele =$compile($.parseHTML(result))($scope);
          $element.html(ele);
        }else{
          $element.html("");
        }
      });
    };

  }
})();
