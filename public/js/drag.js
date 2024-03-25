import * as html from './html_manipulation.js'

export function start(event) {
	console.log('configuring drag start')
	event.dataTransfer.clearData()
	event.dataTransfer.setData('text/plain', event.target.dataset.id)
}

export function enter(event) {
	event.preventDefault()
	event.target.classList.add('__item-hovered')
}

export function leave(event) {
	event.preventDefault()
	event.target.classList.remove('__item-hovered')
}

export function over(event) {
	event.preventDefault()
}

export function drop(event) {
	const element = event.target
	event.stopPropagation()
	event.target.classList.remove('__item-hovered')
	const emitter_id = event.dataTransfer.getData('text/plain')
	const emitter = htmx.find(`[data-id="${emitter_id}"]`)

	if (OGLIST.includes(emitter_id)) {
		const clone = html.clone(emitter)
		console.log(`clonning ${emitter_id}:(${clone.id}) to ${element.dataset.id}`)
		element.appendChild(clone)
	} else {
		console.log(`moving ${emitter_id} to ${element.dataset.id}`)
		element.appendChild(emitter)
	}
}
