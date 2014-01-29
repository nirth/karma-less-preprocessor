# karma-less-preprocessor

## Configuration

### options
 
 
 * `save`: [`Boolean`] Indicates whether result of compilation should be saved in project directory.
 * `paths`: [`Array`] of paths to folders that should be used for file lookup when using `@import`.
 * `compress`: [`Boolean`] Indicates whether css should be compressed or not.

> `options` key could contain any other standard less options as well

  For exmaple, `rootpath` option is specified in below example configuration

### additionalData

 * `additionalData`:`Object` which can contain the `Object` modifyVars and/or the `Object` globalVars. With those you can tell the less compiler to add global variables or modify existing ones during compilation.
 
### Example configuration

	module.exports = (config) -> config.set {
	        basePath: 'src'
	        preprocessors:
	                '**/*.coffee': ['coffee']
	                'resources/**/*.less': ['less']
	
	        files: [
	                '**/*.coffee'
	                'resources/less/index.less'
	        ]
	
	        coffeePreprocessor:
	                options:
	                        bare: true
	                        sourceMap: false
	                transformPath: (path) -> path.replace(/\.coffee$/, '.js')
	
	        lessPreprocessor:
	                options:
	                        paths: ['resources/less']
	                        save: true
	                        rootpath: 'target/resources/img'
	                additionalData:
	                        modifyVars:
	                                'bodyColor': 'grey'
	                                'secondBoxColor': 'blue'
	                        globalVars:
	                                'globalBoxColor': 'red'
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
