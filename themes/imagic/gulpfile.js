const browserify = require('browserify');
const gulp = require('gulp');
const { src, dest } = require('gulp');
const minifyCss = require('gulp-minify-css');
const sass = require("gulp-sass");
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const uglify = require('gulp-uglify');
const gutil = require('gulp-util');
const size = require('gulp-size');
const argv = require('yargs').argv;
const autoprefixer = require('gulp-autoprefixer');
const collapse = require('bundle-collapser/plugin');
const imagemin = require('gulp-imagemin');
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

const paths = {
    css: {
        src: "scss/**/*.scss",
        dest: "../../public/_resources/themes/imagic/css/"
    },
    js: {
        src: "js/*.js",
        dest: "../../public/_resources/themes/imagic/js/"
    },
    img: {
        src: "img/*",
        dest: "../../public/_resources/themes/imagic/img/"
    },
    assets: {
        src: "assets/*",
        dest: "../../public/_resources/themes/imagic/assets/"
    }
}

const config = {
    autoprefixer: {
        cascade: false,
    },
    browserify: {
        name: 'bundle.js',
        dest: '../../public/_resources/themes/imagic/js',
        options: {
          debug: false,
          entries: 'js/app.js',
        },
        error: function(err) {
          gutil.log(gutil.colors.red('Browserify error:') + ' ' + err.message);
          this.emit('end');
        },
    },
    compress: ! argv.u,
    sass: {
        error: function(err) {
            gutil.log(gutil.colors.red('Sass error:') + ' ' + err.message);
            this.emit('end');
        },
    },
    minifyCss: {
        keepBreaks: true,
        keepSpecialComments: false,
    },
    size: {
        showFiles: true,
    }
}

function js() {
    var bundler  = browserify(config.browserify.options);
    clearJs();
    return bundler.plugin(collapse).bundle()
    .on('error', config.browserify.error)
    .pipe(source(config.browserify.name))
    .pipe(buffer())
    .pipe(config.compress ? uglify().on('error', function(err) {
      gutil.log(gutil.colors.red('[Error]'), err.toString());
      this.emit('end');
    }) : gutil.noop())
    .pipe(size(config.size))
    .pipe(dest(config.browserify.dest, {allowEmpty: true}))
    .pipe(browserSync.stream(),{allowEmpty: true});
}

function css() {
    clearCss();
    return src(paths.css.src, {allowEmpty: true})
    .pipe(sass()).on("error", config.sass.error)
    .pipe(autoprefixer(config.autoprefixer))
    .pipe(minifyCss(config.minifyCss))
    .pipe(size(config.size))
    .pipe(dest(paths.css.dest, {allowEmpty: true}))
    .pipe(browserSync.stream());
}

function imgSquash() {
    return src(paths.img.src)
    .pipe(imagemin())
    .pipe(dest(paths.img.dest, {allowEmpty: true}))
}

function assets() {
    return src(paths.assets.src)
    .pipe(imagemin())
    .pipe(dest(paths.assets.dest, {allowEmpty: true}))
}

function clearCss() {
    return src(paths.css.dest, {
            read: false
        })
        .pipe(clean({force: true}));
}

function clearJs() {
    return src(paths.js.dest, {
            read: false
        })
        .pipe(clean({force: true}));
}

function clearAssets() {
    return src(paths.assets.dest, {
            read: false
        })
        .pipe(clean({force: true}));
}

function watch() {
    gulp.watch(paths.css.src, css, {allowEmpty: true});
    gulp.watch(paths.js.src, js, {allowEmpty: true});
    gulp.watch(paths.img.src, imgSquash, {allowEmpty: true});
    gulp.watch(paths.assets.src, assets, {allowEmpty: true});
}

gulp.task('build', gulp.parallel(css, js));

exports.watch = watch;


