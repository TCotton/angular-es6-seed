module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.jsInput)
      .pipe(plugins.cached('jscs'))
      .pipe(plugins.jscs())
      .pipe(plugins.jscs.reporter());
  };
};
