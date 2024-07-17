const define = (name, value) => Object.defineProperty(window, name, {
    get: _ => value,
    set: _ => {throw(name+' is a constant and cannot be redeclared.')},
})

define(
    'OGLIST',
    Array.from(document.querySelectorAll('.__og-drag')).map(e => e.dataset.id)
)

function element(query) {
    return document.querySelector(query)
}

function elements(query) {
    return document.querySelectorAll(query)
}
