const define = (name, value) => Object.defineProperty(window, name, {
	get: _ => value,
	set: _ => {throw(name+' is a constant and cannot be redeclared.')},
})

define('OGLIST', Array.from(htmx.findAll('.__og-drag')).map(e => e.dataset.id))
