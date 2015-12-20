module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    gulp.src(filePaths.sassInput + 'main.scss')
      .pipe(plugins.sourcemaps.init())
      .pipe(plugins.sass({
        outputStyle: 'expanded'
      }))
      .pipe(plugins.sass().on('error', plugins.sass.logError))
      .pipe(plugins.autoprefixer({
        browsers: ['last 2 Chrome versions'],
        cascade: false,
      }))
      .pipe(plugins.sourcemaps.write('.'))
      .pipe(gulp.dest(filePaths.sassOut));
  };
};