var gulp = require('gulp'),
    plumber = require("gulp-plumber"),
    rename = require('gulp-rename'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    browserSync = require('browser-sync').create(); // create a browser sync instance.

gulp.task('pug', function (cb) {
  let options = {
    pretty: true
  };
  return gulp.src('src/*.pug')
  .pipe( plumber() )
  .pipe( pug(options) )
  .pipe( rename({
    extname: '.php'
  }) )
  .pipe( gulp.dest('dist/') );
});

gulp.task('auto-reload', function () {
  browserSync.init({
    proxy: 'http://localhost/dist',
    files: ["**/*.php"]
  });
});

gulp.task('watch', ['auto-reload', 'pug'], function() {
  gulp.watch('src/*.pug', ['pug']);
  gulp.watch('dist/css/*.css').on('change', browserSync.reload);
});
