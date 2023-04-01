const Renderer = require('./Renderer')
const LiveServer = require('live-server')

const { path } = require('./FsUtils')

const params = {
	port: 8080, // Set the server port. Defaults to 8080.
	host: 'localhost',
	root: path('index.html'),
	open: path('index.html'),
}

async function start() {
	await Renderer.watch()
	LiveServer.start(params)
}

start().then(() => console.log('Server started'))
