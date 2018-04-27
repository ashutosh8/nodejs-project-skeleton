const gulp = require('gulp');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const pump = require('pump');

// Babel tasks

gulp.task('babelify-controllers', () => {
  return gulp.src('src/controllers/**/*.js').pipe(babel({
    presets: ['es2015'],
  })).pipe(gulp.dest('lib/controllers/'));
});

gulp.task('babelify-routes', () => {
  return gulp.src('src/routes/**/*.js').pipe(babel({
    presets: ['es2015'],
  })).pipe(gulp.dest('lib/routes/'));
});

// Image Compression task

gulp.task('compress-image', () => {
  return gulp.src('./src/public/images/*')
    .pipe(imagemin())
    .pipe(gulp.dest('lib/public/images/'));
});

// Minify Tasks 

// Vendor JS
gulp.task('minify-js-vendor', () => {
  pump([
    gulp.src('src/public/vendor/**/*.js'),
    uglify(),
    gulp.dest('lib/public/vendor'),
  ]);
});

// Vendor CSS
gulp.task('minify-css-vendor', () => {
  return gulp.src('src/public/vendor/**/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest('lib/public/vendor'));
});

//  User built JS
gulp.task('babelify-js', () => {
  return gulp.src('src/public/javascripts/*.js')
    .pipe(babel({
      presets: ['es2015'],
    }))
    .pipe(gulp.dest('lib/public/javascripts'));
});

// User built CSS
gulp.task('minify-css', () => {
  return gulp.src('src/public/stylesheets/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest('lib/public/stylesheets'));
});

// Copy templates
gulp.task('copy-html', () => {
  return gulp.src('src/public/templates/*.html')
    .pipe(gulp.dest('lib/public/templates'));
});

// Default task

gulp.task('watch', () => {
  gulp.watch(['./src/server-controllers/**/*.js'], ['babelify-server-controllers']);
  gulp.watch(['./src/routes/**/*.js'], ['babelify-routes']);
  gulp.watch(['./src/public/images/**/*'], ['compress-image']);
  gulp.watch(['./src/public/vendor/**/*.js'], ['minify-js-vendor']);
  gulp.watch(['./src/public/vendor/**/*.css'], ['minify-css-vendor']);
  gulp.watch(['./src/public/javascripts/*.js'], ['babelify-js']);
  gulp.watch(['./src/public/stylesheets/*.css'], ['minify-css']);
  gulp.watch(['./src/public/templates/*.html'], ['copy-html']);
});

// Start task

gulp.task('default', ['watch', 'babelify-server-controllers', 'babelify-routes', 'compress-image', 'minify-js-vendor', 'minify-css-vendor', 'babelify-js', 'minify-css', 'copy-html']);
