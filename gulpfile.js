const { src , dest, watch, parallel, series } = require('gulp');
const gulp = require('gulp');
const ts = require('gulp-typescript');
const sass = require('gulp-sass')(require('sass'));
const nodemon = require('gulp-nodemon')



const files = {
    sassPath: 'public/styles/**/*.scss',
    jsPath: 'public/js/**/*.js',
    tsPath: 'src/**/*.ts',
    imagesPath: 'public/images/**/*',
    viewsPath: 'views/**/*.ejs'
}
const tsProject = ts.createProject('tsconfig.json')

function tsTask() {
    return src(files.tsPath)
    .pipe(tsProject())
    .pipe(dest('dist/src'))
}

function jsTask() {
    return src(files.jsPath)
    .pipe(dest('dist/public/js'))
}

function sassTask() {
    return src(files.sassPath)
        .pipe(sass())
        .pipe(dest('dist/public/styles'))
}

function imagesTask() {
    return src(files.imagesPath)
        .pipe(dest('dist/public/images'))
}

function viewsTask() {
    return src(files.viewsPath)
        .pipe(dest('dist/views'))
}

function watchTask() {
    watch([files.imagesPath, files.viewsPath, files.sassPath, files.tsPath, files.jsPath], parallel(imagesTask, viewsTask, sassTask, tsTask, jsTask))
}


exports.default = series(parallel(imagesTask, viewsTask, sassTask, tsTask, jsTask), watchTask)

