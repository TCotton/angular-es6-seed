module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.configInput)
      .pipe(plugins.ngConstant())
      // Writes config.js to dist/ folder
      .pipe(gulp.dest(filePaths.configOut));
  };
};