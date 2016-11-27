/**
 *  Welcome to your gulpfile!
 *  The gulp tasks are split into several files in the gulp directory
 *  because putting it all here was too long
 */

'use strict';

var gulp = require('gulp');
var changed = require('gulp-changed-in-place');
var minifyjs = require('gulp-uglify');
var minifycss = require('gulp-clean-css');
var reformatjs = require('gulp-beautify');
var reformathtml = require('gulp-html-prettify');
var log = require('gulp-logger');
var assess = require('gulp-if');
var sass = require('gulp-sass');
var param = require('yargs').argv;
var gulpQueue = require('gulp-queue')(gulp);
var exit  = require('gulp-exit');
var server = require('gulp-server-livereload');
var wait = require('gulp-wait');


var env = process.env;
var queue = new gulpQueue();
// path
var src = "src";
var targetServer = env.CATALINA_HOME+ "/webapps/";
var jsloc = 'src/js/**/*.js';
var htmlloc = 'src/view/**/*.html';
var indexloc = 'src/index.html';
var sassloc = 'scss/**/*.scss';
var sasssrc = 'scss/main.scss';
var csstarget = '/assets/css';

var targetEnv;

gulp.task('serve', function(){
	// gulp.watch()
	targetEnv = targetServer + (param.target || 'bvha2');
	console.log("deployed to: "+ targetEnv);
	buildJs(targetEnv, true, true);
	buildHtml(targetEnv,true);
	buildsass(targetEnv);
	// copyLib(targetEnv);
	gulp.watch(jsloc, queue(['redeployjs']));
	gulp.watch([htmlloc, indexloc], queue(['redeployhtml']));
	gulp.watch(sassloc,queue(['redeploysass','buildsass']));
});


gulp.task('run', function(){

	buildJs(src,true,false);
	buildHtml(src,true);
	buildsass(src);
	gulp.watch(jsloc, queue(['reformatjs']));
	gulp.watch([htmlloc, indexloc], queue(['reformathtml']));
	gulp.watch(sassloc,queue(['buildsass']));
	gulp.src('src')
	    .pipe(server({
	      livereload: true,
	      open: true,
	      defaultFile: 'index.html',
	      proxies: [{source: '/endpoint', target: 'http://localhost:8080/billing-service'}]
	    }));


});

gulp.task('redeployjs', function(){
	buildJs(targetEnv, true, false)
})

gulp.task('reformatjs', function(){
	buildJs(src,true,false);
});

gulp.task('redeployjs', function(){
	buildJs(targetEnv, true, false)
})

gulp.task('reformathtml', function(){
	buildHtml(src,true);
});

gulp.task('redeployhtml', function(){
	buildHtml(targetEnv,true);
})

gulp.task('build', build);


gulp.task("copylib", function(){
	var target = targetServer + (param.target || 'bvha2');
	console.log(target);
	copyLib(target);
})

gulp.task('buildsass', function(){
	buildsass(src);
});

gulp.task('redeploysass', function(){

	buildsass(targetEnv);
})

gulp.task('default', function(){
	console.log("start distjs disthtml build copylib buildsass");
})

gulp.task('deploy', function(){
	var target = targetServer + (param.target || 'bvha2');
	console.log("deployed to: "+ target)
	buildJs(target, false, false);
	buildHtml(target, false);
	buildsass(target);
	copyLib(target);
})


 


function buildJs(target, isChanged, minify){
	gulp.src(jsloc, {base:src})
		.pipe(wait(300))
		.pipe(assess(isChanged,changed())).on('error', swallowError)
		.pipe(assess(minify,minifyjs(),reformatjs({indentSize: 0.5}))).on('error', swallowError)
		.pipe(gulp.dest(target))
		.pipe(log())
}

function buildHtml(target, isChanged){
	gulp.src([htmlloc, indexloc], {base:src})
		.pipe(wait(300))
		.pipe(assess(isChanged,changed()))
		.pipe(reformathtml({indent_size:2}))
		.pipe(gulp.dest(target))
		.pipe(log())
		.on('error', swallowError)
}

function copyLib(target){
	gulp.src('src/library/**/*', {base:src})
		.pipe(gulp.dest(target))
		.pipe(log());
}

function buildsass(target){
	console.log(target + csstarget);
	gulp.src(sasssrc)
		.pipe(wait(300))
		.pipe(sass())
		.on('error', sass.logError)
		.pipe(minifycss())
		.pipe(gulp.dest(target + csstarget));
}

function build(){
	buildJs(src, false, false);
	buildHtml(src, false);
	buildsass(src);
}

function swallowError (error) {

  // If you want details of the error in the console
  console.log(error.toString())

  this.emit('end')
}







