// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function(config) {
	config.set({
		basePath: '',
		frameworks: ['jasmine', '@angular-devkit/build-angular'],
		plugins: [
			require('karma-jasmine'),
			require('karma-chrome-launcher'),
			require('karma-jasmine-html-reporter'),
			require('karma-coverage-istanbul-reporter'),
			require('@angular-devkit/build-angular/plugins/karma')
		],
		client: {
			clearContext: false // leave Jasmine Spec Runner output visible in browser
		},
		coverageIstanbulReporter: {
			dir: require('path').join(__dirname, './coverage/client'),
			reports: ['html', 'lcovonly', 'text-summary'],
			fixWebpackSourcePaths: true,
			thresholds: {
				statements: 50,
				branches: 30,
				functions: 50,
				lines: 50,
			}
		},
		reporters: ['progress', 'kjhtml'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		singleRun: true,
		//frameworks: ["mocha", "chai"],
		browsers: ['HeadlessChromeLocal'],
		customLaunchers: {
			HeadlessChromeLocal: {
				base: 'ChromeHeadless',
				flags: [
					'--disable-gpu',
					'--disable-translate',
					'--disable-extensions',
					'--no-sandbox',
					'--remote-debugging-port=9223',
				]
			}
		},
		restartOnFileChange: true,
		concurrency: Infinity
	});
};
