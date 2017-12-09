const gulp          = require('gulp');
const notify        = require('gulp-notify');
const source        = require('vinyl-source-stream');
const browserify    = require('browserify');
const babelify      = require('babelify');
const ngAnnotate    = require('browserify-ngannotate');
const browserSync   = require('browser-sync').create();
const rename        = require('gulp-rename');
const templateCache = require('gulp-angular-templatecache');
const uglify        = require('gulp-uglify');
const merge         = require('merge-stream');

// Where our files are located
var jsFiles = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function (error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};

gulp.task('browserify', ['views'], function () {
  return browserify('./src/js/app.js')
    .transform(babelify, {
      presets: ["env"]
    })
    .transform(ngAnnotate)
    .bundle()
    .on('error', interceptErrors)
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('main.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./build/'));
});

gulp.task('html', function () {
  return gulp.src("src/index.html")
    .on('error', interceptErrors)
    .pipe(gulp.dest('./build/'));
});

gulp.task('views', function () {
  return gulp.src(viewFiles)
    .pipe(templateCache({
      standalone: true
    }))
    .on('error', interceptErrors)
    .pipe(rename("app.templates.js"))
    .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'browserify'], function () {
  var html = gulp.src("build/index.html")
    .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
    .pipe(uglify())
    .pipe(gulp.dest('./dist/'));

  return merge(html, js);
});

gulp.task('default', ['html', 'browserify'], function () {
  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 8001,
    notify: false,
    ui: {
      port: 8002
    }
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
});