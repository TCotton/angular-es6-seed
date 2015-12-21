//  delete files and folders -> https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

// sudo npm install -g mozjpeg
// sudo npm install -g jspm

'use strict';

// gulp-ng-annotate

const gulp = require('gulp');
const plugins = require('gulp-load-plugins')();

const devPath = './gulp/gulp-dev/';
const prodPath = './gulp/gulp-prod/';

const filePaths = {
  output: 'dist/',
  sassInput: 'src/assets/styles/',
  sassOut: 'dist/assets/styles/',
  jsInput: 'src/app/**/*.js',
  jsOut: 'src/app/'
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

gulp.task('jsJshint:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJshintDev']);
});

gulp.task('jsJscs:watch', function() {
  gulp.watch(filePaths.sassInput + '*.scss', ['sassDev']);
});

gulp.task('sassDev:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJscsDev']);
});

gulp.task('default', ['sassDev', 'sassDev:watch', 'jsJshint:watch', 'jsJscs:watch']);