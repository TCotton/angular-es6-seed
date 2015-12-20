module.exports = function(gulp, plugins, filePaths) {
  return function() {
    gulp.src('src/sass/styles.scss')
      .pipe(plugins.sass())
      .pipe(plugins.autoprefixer())
      .pipe(plugins.minifyCss())
      .pipe(gulp.dest(filePaths.dest));
  };
};
