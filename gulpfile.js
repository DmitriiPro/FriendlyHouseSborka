import gulp from 'gulp';
import browserSync from 'browser-sync';
import sassPkg from 'sass';
import gulpSass from 'gulp-sass';
import gulpCssimport from 'gulp-cssimport';
import del from 'del';
import htmlmin from 'gulp-htmlmin';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import concat from 'gulp-concat';
import soursemaps from 'gulp-sourcemaps';
import gulpImg from 'gulp-image';
import gulpWebp from 'gulp-webp';
import gulpAvif from 'gulp-avif';

const prepros = true;

const sass = gulpSass(sassPkg);

const allJS = [
	'src/libs/jquery-3.6.0.min.js',
	'src/libs/swiper-bundle.min.js',
];

//задачи

export const html = () => gulp
	.src('src/*.html')
	.pipe(htmlmin({
		removeComments: true,
		collapseWhitespace: true,
	}))
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream());

export const scss = () => {
	if(prepros) {
		return gulp
			.src('src/scss/**/*.scss')
			.pipe(soursemaps.init())
			.pipe(sass().on('error', sass.logError))
			.pipe(cleanCSS({
				2: {
					specialComments: 0,
				}
			}))
			.pipe(soursemaps.write('../maps'))
			.pipe(gulp.dest('dist/css'))
			.pipe(browserSync.stream());
	}
	return gulp
		.src('src/css/index.css')
		.pipe(soursemaps.init())
		.pipe(gulpCssimport({
			extensions: ['css'],
		}))
		.pipe(cleanCSS({
			2: {
				specialComments: 0,
			}
		}))
		.pipe(soursemaps.write('../maps'))
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.stream());
}

export const js = () => gulp
	.src([...allJS, 'src/js/**/*.js'])
	.pipe(soursemaps.init())
	.pipe(terser())
	.pipe(concat('index.min.js'))
	.pipe(soursemaps.write('../maps'))
	.pipe(gulp.dest('dist/js'))
	.pipe(browserSync.stream());

export const img = () => gulp
	.src('src/img/**/*.{jpg,jpeg,png,svg,gif}')
	.pipe(gulpImg({
		optipng: ['-i 1', '-strip all', '-fix', '-o7', '-force'],
		pngquant: ['--speed=1', '--force', 256],
		zopflipng: ['-y', '--lossy_8bit', '--lossy_transparent'],
		jpegRecompress: ['--strip', '--quality', 'medium', '--min', 40, '--max', 80],
		mozjpeg: ['-optimize', '-progressive'],
		gifsicle: ['--optimize'],
		svgo: true,
	}))
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.stream());

export const webp = () => gulp
	.src('src/img/**/*.{jpg,jpeg,png}')
	.pipe(gulpWebp({
		quality: 70
	}))
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.stream());

export const avif = () => gulp
	.src('src/img/**/*.{jpg,jpeg,png}')
	.pipe(gulpAvif({
		quality: 70
	}))
	.pipe(gulp.dest('dist/img'))
	.pipe(browserSync.stream());

export const copy = () => gulp
	.src('src/font/**/*', {
		base: 'src'
	})
	.pipe(gulp.dest('dist'))
	.pipe(browserSync.stream({
		once: true
	}));

export const server = () => {
	browserSync.init({
		ui: false,
		notify: false,
		// tunnel: true,
		server: {
			baseDir: 'dist'
		}
	})

	gulp.watch('./src/**/*.html', html);
	gulp.watch(
		prepros ? 
		'./src/scss/**/*.scss' : 
		'./src/css/**/*.css', 
		scss);
	gulp.watch('src/img/**/*.{jpg,jpeg,png,svg,gif}', img);
	gulp.watch('./src/js/**/*.js', js);
	gulp.watch('./src/font/**/*', copy);
	gulp.watch('src/img/**/*.{jpg,jpeg,png}', webp);
	gulp.watch('src/img/**/*.{jpg,jpeg,png}', avif);

};

export const clear = () => del('dist/**/*', {forse: true,});


//запуск

export const base = gulp.parallel(html, scss, js, img, avif, webp, copy);

export const build = gulp.series(clear, base);

export default gulp.series(base, server);