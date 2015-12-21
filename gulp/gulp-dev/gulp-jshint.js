module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.jsInput)
      .pipe(plugins.cached('jshint'))
      .pipe(plugins.jshint())
      .pipe(plugins.jshint.reporter());
  };
};