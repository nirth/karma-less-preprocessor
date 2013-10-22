module.exports = (config) -> config.set {
	basePath: ''
	preprocessors:
		'src/**/*.coffee': ['coffee']
		'src/resources/**/*.less': ['less']

	files: [
		'src/**/*.coffee'
		'src/resources/less/index.less'
	]

	coffeePreprocessor:
		options:
			bare: true
			sourceMap: false
		transformPath: (path) -> path.replace(/\.coffee$/, '.js')

	lessPreprocessor:
		options:
			paths: ['src/resources/less']
			save: true
		transformPath: (path) -> path.replace(/\.less$/, '.compiled.css')

	
	browsers: ['Chrome']
	captureTimeout: 6000
	hostname: 'localhost'
	port: 9876

	plugins: [
		'karma-coffee-preprocessor'
		'karma-less-preprocessor'
		'karma-chrome-launcher'
	]

	singleRun: false
}
