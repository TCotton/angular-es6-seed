'use strict';
//  delete files and folders -> https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const devPath = './gulp/gulp-dev/';
const prodPath = './gulp/gulp-prod/';

const filePaths = {
  base: 'src/app',
  output: 'dist/',
  sassInput: 'src/assets/styles/',
  sassOut: 'src/assets/styles/',
  jsInput: 'src/app/**/*.js',
  jsOut: 'src/app/',
  configInput: 'src/common/json/config.json',
  configOut: 'src/app/config/',
};

let getDevTask = function getTask(task) {
  return require(devPath + task)(gulp, plugins, filePaths);
};

let getProdTask = function getTask(task) {
  return require(prodPath + task)(gulp, plugins, filePaths);
};

gulp.task('sassDev', getDevTask('gulp-sass'));
gulp.task('jsJshintDev', getDevTask('gulp-jshint'));
gulp.task('jsJscsDev', getDevTask('gulp-jscs'));
gulp.task('constants', getDevTask('gulp-create-constants'));
gulp.task('babelDev', getDevTask('gulp-babel'));

gulp.task('jsJshint:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJshintDev']);
});

gulp.task('jsJscs:watch', function() {
  gulp.watch(filePaths.sassInput + '*.scss', ['sassDev']);
});

gulp.task('sassDev:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJscsDev']);
});

gulp.task('default', ['sassDev', 'constants', 'sassDev:watch', 'jsJshint:watch', 'jsJscs:watch']);
