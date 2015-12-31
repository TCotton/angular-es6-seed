module.exports = function(gulp, plugins, filePaths) {
  'use strict';
  return function() {
    return gulp.src(filePaths.imageInput)
      .pipe(plugins.newer(filePaths.imageOutput))
      .pipe(plugins.imagemin({
        progressive: true,// jpeg progressive
        interlaced: true,// gif interlace
        multipass: true, // svg multipass
        optimizationLevel: 2, // png optimisation level
        svgoPlugins: [
          {removeViewBox: false},               // don't remove the viewbox atribute from the SVG
          {removeUselessStrokeAndFill: false},  // don't remove Useless Strokes and Fills
          {removeEmptyAttrs: true},             // don't remove Empty Attributes from the SVG
        ],
        use: [
          /*        plugins.imageminMozjpeg,
           plugins.imageminPngquant,*/ // resolve these plugin names
        ],
      }))
      .pipe(gulp.dest(filePaths.imageOutput));
    // Writes config.js to dist/ folder
  };
};