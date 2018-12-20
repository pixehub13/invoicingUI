var gulp = require("gulp"),
	fs = require('fs'),
	del = require("del"),
	resolve = require('path').resolve,
	git = require('gulp-git'),
	gulpConfig = require("../gulpfile.config.json");
process.chdir("../");
gulp.task("Create", function () {
	let path = gulpConfig.path.src + '**';
	if (fs.existsSync(resolve( gulpConfig.path.src))) {
		console.error("axFrmk is allready cloned on ", path);
		return;
	}
	return gulp.src('*.*', {read: false})
		.pipe(gulp.dest(gulpConfig.profiles.dev.es6.prepare))
		.pipe(gulp.dest(gulpConfig.profiles.dev.es5.prepare))
		.pipe(gulp.dest(gulpConfig.profiles.prod.prepare))
		.pipe(gulp.dest(gulpConfig.profiles.dev.es6.public))
		.pipe(gulp.dest(gulpConfig.profiles.dev.es5.public))
		.pipe(gulp.dest(gulpConfig.profiles.prod.public)),
		git.clone('https://github.com/bogdanim36/ax-frmk.git', {args: gulpConfig.path.src}, function (err) {
			if (err) throw err;
			let path = gulpConfig.path.src + gulpConfig.configs["app-modules"].path;
			del([path + '/**', '!' + path]).then(paths => {
				gulp.src(gulpConfig.path.src + "excepted/index.*.html").pipe(gulp.dest(path));
				gulp.src(gulpConfig.path.src + "excepted/app-modules/**/*").pipe(gulp.dest(path));
			});
		});
});
