const { promises: fs, createReadStream, createWriteStream, statSync } = require('fs')

// GET ABSOLUTE PATH
// following function will return absolute path of the file or folder
module.exports.path = (...dirs) => [process.cwd(), ...dirs].join('/')

// GET FOLDERS
// following function will return list of folders in the given directory
module.exports.folders = async function (parent) {
	const subs = await fs.readdir(parent, { withFileTypes: true })
	return subs.filter(d => d.isDirectory()).map(d => d.name)
}

// GET FILES
// following function will return list of folders in the given directory
module.exports.files = async function (parent) {
	const subs = await fs.readdir(parent, { withFileTypes: true })
	return subs.filter(d => !d.isDirectory()).map(d => d.name)
}

// CREATE A WRITE STREAM
// following function will create a write stream to given directory
module.exports.writeStream = f => createWriteStream(f)

// CREATE A READ STREAM
// following function will create a read stream to given directory
module.exports.readStream = f => createReadStream(f)

// RETURN META DATA OF THE FILE
// following function will return meta data of the given directory
module.exports.meta = f => statSync(f)

// REMOVE DIRECTORY
// following function will remove the given directory
module.exports.remove = f => fs.unlink(f).catch(() => {})

// MOVE FILE
// following function will move the file from source to target
module.exports.move = (source, target) => fs.rename(source, target)

// WRITE BUFFER TO FILE
// following function will write buffer to the given directory
module.exports.save = (f, buffer) => fs.writeFile(f, buffer)

// READ FILE
// following function will read the given directory
module.exports.read = (f, opts) => fs.readFile(f, opts).then(b => b.toString())

// CREATE DIRECTORY
// following function will create the given directory
module.exports.mkdir = (target, mkdir = false) => fs.mkdir(target, { mkdir })

// CHECK
// following function will check if the given directory exists
module.exports.exists = f =>
	fs
		.access(f)
		.then(() => true)
		.catch(() => false)
