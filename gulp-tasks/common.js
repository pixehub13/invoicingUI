/// <binding ProjectOpened='Dev-Watch-Es6' />
"use strict";
var gulp = require("gulp"),
	fs = require('fs'),
	concat = require("gulp-concat"),
	del = require("del"),
	plumber = require('gulp-plumber'),
	jshint = require("gulp-jshint"),
	stylish = require('jshint-stylish'),
	sftp = require('gulp-sftp'),
	gulpConfig = require("../gulpfile.config.json"),
	sftpConfig = require("../gulpfile.sftp.json"),
	tasks = gulpConfig.tasks;

global.dev = {short: "dev", long: "DEVELOPMENT"};
global.prod = {short: "prod", long: "PRODUCTION"};
var configFiles = gulpConfig.configs;
for (let config in configFiles) {
	let path = configFiles[config].path + "/gulp-config.json";
	configFiles[config].data = require("../" + gulpConfig.path.src + path)
}


global.addBowerLibsFolders = function (destination, prefix, sufix, root) {
	root = root || gulpConfig.path.src;
	for (let i = 0; i < gulpConfig.path.bowerLibs.length; i++) {
		let path = root + gulpConfig.path.bowerLibs[i];
		destination.push(prefix + path + sufix);
	}
}
global.isBowerLibs = function (path) {
	for (let i = 0; i < gulpConfig.path.bowerLibs.length; i++) {
		let pathI = gulpConfig.path.src + gulpConfig.path.bowerLibs[i];
		if (path.startsWith(pathI)) return true;
	}
	return false;
};

global.files = {
	jsHint: {
		config: {esversion: 6},
		files: [
			gulpConfig.path.src + "**/*.js",
			"!" + gulpConfig.path.src + "{excepted,excepted/**}",
			"!" + gulpConfig.path.src + "**/*.min.js*"]
	},
	common: {
		scssFiles: [gulpConfig.path.src + "**/*.scss",
			"!" + gulpConfig.path.src + "{excepted,excepted/**}"],
		es5Files: [gulpConfig.path.src + "**/*.min.js",
			"!" + gulpConfig.path.src + "{excepted,excepted/**}"],
		es6Files: [gulpConfig.path.src + "**/*.js",
			"!" + gulpConfig.path.src + "**/*.min.js",
			"!" + gulpConfig.path.src + "{excepted,excepted/**}"],
		restFiles: [
			gulpConfig.path.src + '**/*',
			!gulpConfig.path.src + '**/*.*_tmp___',
			'!' + gulpConfig.path.src + "{excepted,excepted/**}",
			'!' + gulpConfig.path.src + ".git/**",
			'!' + gulpConfig.path.src + '**/*.js',
			'!' + gulpConfig.path.src + '**/*.scss',
			'!' + gulpConfig.path.src + 'index*.html',
			"!**/*.cs",
			"!**/*.md",
			"!" + gulpConfig.path.src + "**/gulp-*.*",
			"!" + gulpConfig.path.src + "**/*git*",
			"!" + gulpConfig.path.src + "**/.gitignore",
			"!" + gulpConfig.path.src + "/**/.gitignore1"]
	},
	development: {},
	production: {
		src: {
			html: [gulpConfig.path.src + '**/*.html',
				"!" + gulpConfig.path.src + "index.html",
				"!" + gulpConfig.path.src + "**/*.dev.html",
				"!" + gulpConfig.path.src + "**/*.prod.html",
				"!" + gulpConfig.path.src + "{excepted,excepted/**}"],
			licenses: [gulpConfig.path.src + "/**/LICENSE*",
				"!" + gulpConfig.path.src + "{excepted,excepted/**}"]
		},
		prepare: {
			html: [gulpConfig.profiles.prod.prepare + "/**/*.html",
				gulpConfig.profiles.prod.prepare + "/**/*.config",
				gulpConfig.profiles.prod.prepare + "/**/ax-theme.*.*",
				gulpConfig.profiles.prod.prepare + "/**/*.png",
				gulpConfig.profiles.prod.prepare + "/**/*.jpg",
				"!" + gulpConfig.profiles.prod.prepare + "/**/*." + prod.short + ".*",
				"!" + gulpConfig.profiles.prod.prepare + "/**/*." + dev.short + ".*"],
			api: [gulpConfig.profiles.prod.prepare + "/**/*.php", gulpConfig.profiles.prod.prepare + "/**/*.json"],
			licenses: [gulpConfig.profiles.prod.prepare + "/**/*.md"],
			fontFiles: function () {
				var fontsFileMasks = [];
				for (let i = 0; i < gulpConfig.fontsFileMasks.length; i++) {
					fontsFileMasks.push(gulpConfig.profiles.prod.prepare + gulpConfig.fontsFileMasks[i]);
				}
				return fontsFileMasks;
			},
			exceptedFolders: function (exceptions) {
				var foldersExcepted = [];
				for (let j = 0; j < exceptions.length; j++) {
					foldersExcepted.push(gulpConfig.profiles.prod.prepare + "/" + exceptions + "**/*");
				}
				if (foldersExcepted.length === 0) return [];
				else return [foldersExcepted.join(",")];
			}
		}
	}
};

files.development.restFiles = files.common.restFiles.concat(["!" + gulpConfig.path.src + "**/*." + prod.short + ".*"]);
files.development.es6Files = files.common.es6Files.concat(["!" + gulpConfig.path.src + "**/*." + prod.short + ".*"]);
files.production.src.es6Files = files.common.es6Files.concat(["!" + gulpConfig.path.src + "**/*." + dev.short + ".*"]);
files.production.src.restFiles = files.common.restFiles
	.concat('!' + gulpConfig.path.src + '**/*.html')
	.concat(["!" + gulpConfig.path.src + "**/*." + dev.short + ".*"]);
files.production.prepare.api = files.production.prepare.api
	.concat(["!" + gulpConfig.path.src + "**/*." + dev.short + ".*"]);

addBowerLibsFolders(files.common.es6Files, "!", "/**/*.*");
addBowerLibsFolders(files.common.es5Files, "", "/**/*.js");
addBowerLibsFolders(files.jsHint.files, "!", "/**/*.*");


global.logFile = function (mesaj, path) {
	if (path.extname === "") return;
	console.log(mesaj + ":", typeof path === 'string' ? path : (path.dirname + '\\' + path.basename + path.extname));
};
if (sftpConfig.profiles) {
	for (let profile in sftpConfig.profiles) {
		let profileCfg = sftpConfig.profiles[profile];
		gulp.task("Ftp-deploy-" + profile, function () {
			return gulp.src(profileCfg.src + '/**/*.*')
				.pipe(sftp(profileCfg));
		});
	}
}
require("./development");
require("./production");

global.getBundles = function (taskName) {
	return getFiles().filter(function (bundle) {
		return taskName === bundle.task;
	});
};

function getFiles() {
	var allTasks = [];

	for (let i = 0; i < tasks.length; i++) {
		let task = tasks[i];
		var newTask = {task: task.extension, outputFileName: task.outputFileName, inputFiles: [], exceptions: []};
		for (let config in configFiles) {
			getFilesForTask(configFiles[config].data, newTask);
		}
		allTasks.push(newTask);
	}
	return allTasks;
}

function getFilesForTask(config, task) {
	let files = getTaskFiles(config, task.task, task.outputFileName);
	if (files.length === 0) throw "Not found files for: task: " + JSON.stringify(task) + "\n in Config: " + JSON.stringify(config);
	for (let j = 0; j < files[0].inputFiles.length; j++) {
		task.inputFiles.push(files[0].inputFiles[j]);
	}
	for (let j = 0; j < files[0].exceptions.length; j++) {
		task.exceptions.push(files[0].exceptions[j]);
	}
}

function getTaskFiles(collection, taskName, outputFileName) {
	return collection.filter(function (bundle) {
		if (!bundle.exceptions) bundle.exceptions = [];
		return taskName === bundle.task && outputFileName === bundle.outputFileName;
	});
}

var replaceall = function (replaceThis, withThis, inThis) {
	withThis = withThis.replace(/\$/g, "$$$$");
	return inThis.replace(new RegExp(replaceThis.replace(/([\/\,\!\\\^\$\{\}\[\]\(\)\.\*\+\?\|<>\-\&])/g, "\\$&"), "g"), withThis);
};
