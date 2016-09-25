/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed-in-place');
var minifyjs = require('gulp-uglify');
var reformatjs = require('gulp-beautify');
var reformathtml = require('gulp-html-prettify');
var log = require('gulp-logger');
var assess = require('gulp-if');

var env = process.env;
// path
var src = "src";
var target = env.CATALINA_HOME+ "/webapps/bvha2";
var jsloc = 'src/js/**/*.js';
var htmlloc = 'src/views/**/*.html';
var indexloc = 'src/index.html';

gulp.task('start', function(){
	// gulp.watch()
	console.log(target);
	gulp.watch(jsloc, ['distjs']);
	gulp.watch([htmlloc, indexloc], ['disthtml']);
});


gulp.task('distjs', function(){
	buildJs(true);
});

gulp.task('disthtml', function(){
	buildHtml(true);
});

gulp.task('distribute', function(){
	buildJs();
	buildHtml();
})

function buildJs(flag){
	gulp.src(jsloc, {base:src})
		.pipe(assess(flag,changed()))
		.pipe(reformatjs())
		.pipe(log())
		.pipe(gulp.dest(src))
		.pipe(gulp.dest(target))
		.pipe(log());
}

function buildHtml(flag){
	gulp.src([htmlloc, indexloc], {base:src})
		.pipe(assess(flag,changed()))
		.pipe(reformathtml())
		.pipe(log())
		.pipe(gulp.dest(src))
		.pipe(gulp.dest(target))
		.pipe(log());
}


