"strict";

var gulp 		= require("gulp"),
	sass		= require("gulp-sass"),
	sourcemaps	= require("gulp-sourcemaps"),
	buffer		= require("vinyl-buffer"),
	source		= require("vinyl-source-stream"),
	browserify	= require("browserify"),
	browserSync	= require("browser-sync").create(),
	jasmine		= require("gulp-jasmine"),
	reload 		= browserSync.reload;
	// jsHint		= require("gulp-jshint");

const del = require("del");

var paths = {
	js: [
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/jquery/dist/jquery.min.js",
		"node_modules/owl.carousel/dist/owl.carousel.min.js"
	],
	srcjs: [
		"./build/js/pace.min.js",
		"./build/js/main.js"
	],
	css: [
		"node_modules/bootstrap/dist/css/bootstrap.min.css",
		"node_modules/owl.carousel/dist/assets/owl.carousel.min.css"
	],
	scss: "./build/scss/style.scss",
	dist: "assets/"
};

// deleting css files
gulp.task("del-css", function(){
	return del([paths.dist + 'css/style.css']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

// deleting js files
gulp.task("del-js", function(){
	return del([paths.dist + 'js/scripts.css']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

// moving css files
gulp.task("move-css", function(){
	gulp.src(paths.css)
	.pipe(gulp.dest(paths.dist + "css"));
});
// moving js files
gulp.task("move-js", function(){
	gulp.src(paths.js)
	.pipe(gulp.dest(paths.dist + "js"));
});
// building css files
gulp.task("sass", ["del-css"], function(){
	return gulp.src(paths.scss)
	.pipe(sass({outputStyle: 'compressed'})
	.on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.dist + 'css'))
    .pipe(browserSync.stream());
});
// building js files
gulp.task("js", ["del-js"], function(){
	return browserify(paths.srcjs)
	.bundle()
	.pipe(source('scripts.js'))
	.pipe(buffer())
	.pipe(gulp.dest(paths.dist + 'js'));
});

// checking js statement
// gulp.task("jsHint", []);

// watching and refreshing files
gulp.task("watch", ["sass", "move-css", "move-js", "js"], function(){
	browserSync.init({
			server: {
				proxy: "localhost"
			},
			open: false
		});

	    gulp.watch('./build/scss/**/*.scss', ['sass']);
	    gulp.watch(paths.scrjs, ['js']).on('change', reload);

	    gulp.watch(['./*.html', './*.php', './views/site/*.html', './views/**/*.php']).on('change', reload);
});

// default task
gulp.task("default", ["sass", "move-css", "move-js", "js"]);