var {src, dest, series, watch} = require ('gulp');
var rename = require ('gulp-rename');
var sass = require ('gulp-sass');
var uglifyCSS = require ('gulp-uglifycss');
var livereload = require ('gulp-livereload');
var browserSync = require ('browser-sync').create ();

sass.compiler = require ('node-sass');
var sassInputPath = './src/**/*.scss';
var cssOutputPath = './src/styles';

var parseCSS = function () {
  return src (sassInputPath)
    .pipe (sass ().on ('error', sass.logError))
    .pipe (
      uglifyCSS ({
        maxLineLen: 80,
        uglyComments: true,
      })
    )
    .pipe (
      rename ({
        dirname: 'dist',
        basename: 'app',
        extname: '.css',
      })
    )
    .pipe (dest (cssOutputPath))
    .pipe (browserSync.stream ());
};

var reloadPage = function () {
  browserSync.init ({
    server: './src',
  });
};

watchFiles = function () {
  reloadPage ();
  watch ('./src/**/*.scss', parseCSS);
  watch ('./src/**/*.html').on ('change', browserSync.reload);
};

exports.watchFiles = watchFiles;
