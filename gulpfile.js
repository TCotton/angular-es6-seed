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
};

let getDevTask = function getTask(task) {
  return require(devPath + task)(gulp, plugins, filePaths);
};

let getProdTask = function getTask(task) {
  return require(prodPath + task)(gulp, plugins, filePaths);
};

gulp.task('sass', getDevTask('gulp-sass'));

gulp.task('sass:watch', function() {
  gulp.watch(filePaths.sassInput + '*.scss', ['sass']);
});

gulp.task('default', ['sass', 'sass:watch']);