'use strict';

var gulp = require('gulp');

gulp.task('help', function () {
  console.log('gulp help                获取help');
  console.log('gulp bower               安装bower依赖');
  console.log('gulp watch               启动监测');
  console.log('gulp inject              注入依赖');
  console.log('gulp clean               清空dist, .tmp文件夹');
  console.log('gulp serve               启动服务器');
  console.log('gulp build-dev           build dev项目');
  console.log('gulp build-sit           build sit');
});
