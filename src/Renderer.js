const chokidar = require('chokidar')

const { files, path, save, read } = require('./FsUtils')
const Assets = require('./Assets')
const Helpers = require('./Helpers')

const Handlebars = require('handlebars').create()

async function load() {
	await Assets.load()

	// Register all helpers
	for (const [hName, hFun] of Object.entries(Helpers)) {
		Handlebars.registerHelper(hName, hFun)
	}

	// Register partials
	for (const pName of await files(path('partials'))) {
		Handlebars.registerPartial(pName, read(path('partials', pName)))
	}
}

async function render() {
	const template = Handlebars.compile(await read(path('template.hbs')))
	const html = template(JSON.parse(await read(path('context.json'))))
	await save(path('index.html'), html)
}

module.exports.watch = async function () {
	await load()
	await render()
	chokidar.watch(path('template.hbs'), path('context.json')).on('change', render)
}
