const { files, read, path } = require('./FsUtils')

module.exports.load = async function () {
	const dir = path('assets')

	for (const name of await files(dir)) {
		const file = path('assets', name)
		const isPng = /^.*\.png/.exec(name)

		// if file is a png
		if (isPng) {
			const data = await read(file, { encoding: 'base64' })
			this.assets[name] = `data:image/png;base64,${data}`
		}

		// if a file is a ttf
		else if (/^.*\.ttf/.exec(name)) {
			const data = await read(file, { encoding: 'base64' })
			this.assets[name] = `data:font/ttf;base64,${data}`
		}

		// if something else
		else this.assets[name] = await read(file)
	}
}

module.exports.assets = {}
