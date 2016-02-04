var gulp = require('gulp'),
	webserver = require('gulp-webserver'),
	minifyHTML = require('gulp-minify-html'),
	stylus = require('gulp-stylus'),
	nib = require('nib'),
	minifyCSS = require('gulp-minify-css'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	buffer = require('vinyl-buffer'),
	uglify = require('gulp-uglify'),
	imagesop = require('gulp-image-optimization'),
	smoosher = require('gulp-smoosher');


config = {
	rutserver:{
		watch: './'
	},
	html:{
		main: './dist/index.html',
		watch: './dist/**/*.html',
		output: './'
	},
	styles:{
		main: './src/styles/estilos.styl',
		watch: './src/styles/**/*.styl',
		output: './build/css'
	},
	scripts:{
		main: './src/scripts/all.js',
		watch: './src/scripts/**/*.js',
		output: './build/js'
	},
	images:{
		watch: ['./build/img/**/*.png','./build/img/**/*.jpg','./build/img/**/*.svg'],
		output: './dist/img'
	},
	smoosher:{
		main: './build/index.html',
		watch: ['./build/**/*.html','./build/**/*.css','./build/**/*.js'],
		output: './'
	}
}

gulp.task('server', function(){
	gulp.src(config.rutserver.watch)
		.pipe(webserver({
			host: '0.0.0.0',
			port: 9000,
			// livereload: true,
			// open: true
		}))
});

gulp.task('build:css', function(){
	return gulp.src(config.styles.main)
		.pipe(stylus({
			use: nib(),
			'include css': true
		}))
		.pipe(minifyCSS())
		.pipe(gulp.dest(config.styles.output));
});

gulp.task('build:js', function(){
	return browserify(config.scripts.main)
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(uglify())
		.pipe(gulp.dest(config.scripts.output));
});

gulp.task('imgop', function(){
	gulp.src(config.images.watch)
		.pipe(imagesop({
			optimizationLevel: 5,
	        progressive: true,
	        interlaced: true
		}))
		.pipe(gulp.dest(config.images.output))
});

gulp.task('smoos', function(){
	gulp.src(config.smoosher.main)
		.pipe(smoosher())
		.pipe(gulp.dest(config.smoosher.output));
});
//por el momento no lo estoy utilizando
// gulp.task('dist:html', function(){
// 	return gulp.src(config.html.main)
// 		.pipe(minifyHTML())
// 		.pipe(gulp.src(config.html.output));
// });

gulp.task('watch', function(){
	gulp.watch(config.styles.watch, ['build:css']);
	gulp.watch(config.scripts.watch, ['build:js']);
	gulp.watch(config.images.watch, ['imgop']);
	gulp.watch(config.smoosher.watch, ['smoos']);
});

gulp.task('build', ['build:css','build:js','imgop','smoos'])

gulp.task('default', ['server','watch','build']);