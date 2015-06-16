'use strict';

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var uglify = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var header = require('gulp-header');
var del = require('del');
var rename = require('gulp-rename');

var pkg = require('./package.json');

var extended = [
    '/**',
    ' * <%= pkg.name %> - <%= pkg.description %>',
    ' * @version v<%= pkg.version %>',
    ' * @link <%= pkg.homepage %>',
    ' * @license <%= pkg.license %>',
    ' */',
    ''
].join('\n');

var succint = '// <%= pkg.name %>@v<%= pkg.version %>, <%= pkg.license %> licensed. <%= pkg.homepage %>\n';

var standalone = pkg.config ? (pkg.config.name ? pkg.config.name : pkg.name) : pkg.name;

gulp.task('browserify', ['clean:browser'], function() {
    var bundler = browserify({
        entries: ['./index.js'],
        standalone: standalone
    });

    return bundler
        .bundle()
        .pipe(source(pkg.name + '.js'))
        .pipe(buffer())
        .pipe(header(extended, {pkg: pkg}))
        .pipe(gulp.dest('./browser/'))
        .pipe(rename(pkg.name + '.min.js'))
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(header(succint, {pkg: pkg}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./browser/'));
});

gulp.task('clean:browser', function (cb) {
    del(['browser'], cb);
});