const { assets } = require('./Assets')

module.exports = {
	is(a, b, options) {
		if (a === b) return options.fn(this)
		return options.inverse(this)
	},
	load(name) {
		const data = assets[name]
		return data
	},
	sum(a, b) {
		return a + b
	},
	array() {
		return Array.prototype.slice.call(arguments, 0, -1)
	},
	oneOf(a, values, options) {
		if (values.includes(a)) return options.fn(this)
		return options.inverse(this)
	},
	gt(a, b) {
		return a > b
	},
	lt(a, b) {
		return a < b
	},
	gte(a, b) {
		return a >= b
	},
	lte(a, b) {
		return a <= b
	},
	upper(s, lang) {
		return s?.toLocaleUpperCase(lang)
	},
	pad(v, length) {
		return v.toString().padStart(length, '0')
	},
}
