'use strict';
//  delete files and folders -> https://github.com/gulpjs/gulp/blob/master/docs/recipes/delete-files-folder.md

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const plugins = gulpLoadPlugins();

const devPath = './gulp/gulp-dev/';
const prodPath = './gulp/gulp-prod/';

gulpLoadPlugins({
  DEBUG: false, // when set to true, the plugin will log info to console. Useful for bug reporting and issue debugging
  pattern: ['gulp-*', 'gulp.*', 'imagemin-*'], // the glob(s) to search for
  scope: ['dependencies', 'devDependencies', 'peerDependencies'], // which keys in the config to look within
  replaceString: /^gulp(-|\.)/, // what to remove from the name of the module when adding it to the context
  camelize: true, // if true, transforms hyphenated plugins names to camel case
  lazy: true, // whether the plugins should be lazy loaded on demand
  rename: {}, // a mapping of plugins to rename
});

const filePaths = {
  base: 'src/app',
  output: 'dist/',
  sassInput: 'src/assets/styles/',
  sassOut: 'src/assets/styles/',
  jsInput: 'src/app/**/*.js',
  jsOut: 'src/app/',
  configInput: 'src/common/json/config.json',
  configOut: 'src/app/config/',
  imageInput: 'src/assets/images/**/*',
  imageOutput: 'src/assets/images-optim',
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
gulp.task('imageOptimise', getDevTask('gulp-images'));

gulp.task('jsJshint:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJshintDev']);
});

gulp.task('jsJscs:watch', function() {
  gulp.watch(filePaths.sassInput + '*.scss', ['sassDev']);
});

gulp.task('sassDev:watch', function() {
  gulp.watch(filePaths.jsInput, ['jsJscsDev']);
});

gulp.task('image:watch', function() {
  gulp.watch(filePaths.imageInput, ['imageOptimise']);
});

gulp.task('devBuild', ['sassDev:watch', 'jsJshint:watch', 'jsJscs:watch', 'image:watch']);
