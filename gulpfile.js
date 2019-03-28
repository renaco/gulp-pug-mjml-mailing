'use strict';

let gulp = require('gulp');
let browserSync = require('browser-sync');
let htmlmin = require('gulp-htmlmin');
let mjml = require('gulp-mjml');
let pug = require('gulp-pug');
let rename = require('gulp-rename');

// configs
let inputPath = './source/views/**/*.pug';
let outputPath = './build';

gulp.task('build', () => {
  return gulp.src(inputPath)
    .pipe(pug({
      pretty: true
    }))
    .pipe(rename({
      extname: '.mjml'
    }))
    .pipe(mjml())
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(outputPath));
});

gulp.task('browser-sync', (cb) => {
  browserSync({
    server: {
      baseDir: outputPath
    },
    port: 4000
  }, cb);
});

gulp.task('watch', () => {
  return gulp.watch(inputPath, gulp.series(
    'build'
  ));
});

gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));
