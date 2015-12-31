
var compilerOptions = require('../../babelOptions');
module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.jsInput, {base: filePaths.base})
      .pipe(plugins.plumber())
      .pipe(plugins.changed(filePaths.output, {extension: '.js'}))
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.babel(compilerOptions))
      .pipe(plugins.ngAnnotate({
        sourceMap: true,
        gulpWarnings: true,
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(paths.output));
  };
};