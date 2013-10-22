class App
	constructor: (@name) ->
		console.info "App #{name}"

	createDiv: (className) ->
		div = document.createElement 'div'
		div.classList.add className
		div

	createDivs: =>
		document.body.appendChild @createDiv 'box'
		document.body.appendChild @createDiv 'rectangle'

	start: ->
		console.info "App.start:#{@name}"
		setTimeout @createDivs, 100
	
app = new App 'myApplication'
app.start()