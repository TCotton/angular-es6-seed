module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.configInput)
      .pipe(plugins.ngConstant({
        deps: ['app'],
        wrap: 'commonjs',
      }))
      .pipe(gulp.dest(filePaths.configOut));

    // Writes config.js to dist/ folder
  };
};