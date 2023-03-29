"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const posthtml = require("gulp-posthtml");
const htmlmin = require("gulp-htmlmin");
const include = require("posthtml-include");
const svgstore = require("gulp-svgstore");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const del = require("del");
const imagemin = require("gulp-imagemin");
const webp = require("imagemin-webp");
const extReplace = require("gulp-ext-replace");
const browserSync = require("browser-sync").create();
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const uglify = require('gulp-uglify-es').default;
// const connect = require('gulp-connect-php');


function style() {
  return gulp.src("./source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("./build/css"))
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
}


function clean() {
  return del("build");
}


function cleanImg() {
  return del("build/img");
}


function cleanHTML() {
  return del("build/*.html");
}

function cleanJS() {
  return del("build/js");
}

function cleanPHP() {
  return del("build/*.php");
}


function copy() {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    // "source/img/**",
    "source/js/**",
    "source/libs/**",
    "source/*.html",
    "source/*.php",
    "source/docs/**",
    ], {
    base: "source"
    })
    .pipe(gulp.dest("build"));
}


function copyImg() {
  return gulp.src([
    "source/img/**"
    ], {
    base: "source"
    })
    .pipe(gulp.dest("build"));
}

function html() {
  return gulp.src("source/*.html")
  .pipe(posthtml([
    include()
    ]))
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest("build"));
}

function js() {
  return gulp.src("source/js/**/*.js")
  .pipe(gulp.dest("build/js"))
  .pipe(uglify())
  .pipe(rename({ suffix: ".min" }))
  .pipe(gulp.dest("build/js"));
}

function php() {
  return gulp.src("source/*.php")
  .pipe(gulp.dest("build/"))
}


function images() {
  return gulp.src(["source/img/**/*.{png,jpg,svg}"])
  .pipe(imagemin([
    imagemin.optipng({optimizationLevel: 5}),
    imagemin.mozjpeg({quality: 70, progressive: true}),
    // imagemin.jpegtran({progressive: true}),
    imagemin.svgo()
 ]))
 .pipe(gulp.dest("build/img"));
}

function sprite () {
  return gulp.src("source/img/sprite/*.svg")
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/sprite"));
 }


function exportWebP() {
  return gulp.src(["build/img/**/*.{png,jpg}", "!build/img/favicons/**/*"])
    .pipe(imagemin([
      webp({
        quality: 75
      })
    ]))
    .pipe(extReplace(".webp"))
    .pipe(gulp.dest("build/img"));
}


// function serverPHP() {
//   connect.server({
//     port: 8000,
//     base: 'build'
// });
// }

function server() {
  // connect.server({}, function (){
  browserSync.init({
    server: {
        baseDir: "build"
    },
    notify: false,
    open: true,
    cors: true,
    // port: 8080,
    // proxy: "localhost:8000",
    ui: false
  });
// });
}


function reload() {
  browserSync.reload();
}


function watchTask() {
  gulp.watch("source/sass/**/*.scss", style);
  gulp.watch("source/*.html").on("change", updateHTML);
  gulp.watch("source/js/**/*.js").on("change", updateJS);
  gulp.watch("source/*.php").on("change", updatePHP);
  // gulp.watch("source/img/**/*.{png,jpg,svg}").on("change", updateIMG);
}


exports.copy = copy;
exports.copyImg = copyImg;
exports.images = images;
exports.exportWebP = exportWebP;
exports.clean = clean;
exports.cleanImg = cleanImg;
exports.style = style;
exports.server = server;
exports.sprite = sprite;


const build = gulp.series(clean, copy, style, js, images, sprite, exportWebP, html);
const updateHTML = gulp.series(cleanHTML, html, reload);
const updateJS = gulp.series(cleanJS, js, reload);
const updatePHP = gulp.series(cleanPHP, php, reload);
const updateIMG = gulp.series(cleanImg, copyImg, images, exportWebP, reload);


exports.updateHTML = updateHTML;
exports.updateJS = updateJS;
exports.updateIMG = updateIMG;
exports.updatePHP = updatePHP;
exports.build = build;
exports.default = gulp.series(build, gulp.parallel(server, watchTask));
// exports.default = gulp.series(build, gulp.parallel(server, serverPHP, watchTask));
