import * as html from './html_manipulation.js'

export function start(event) {
    console.log('configuring drag start')
    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/plain', html.get_id(event.target))
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
    const emitter = htmx.find('.' + emitter_id)

    if (OGLIST.includes(emitter_id)) {
        const clone = create_clone_from_emmitter(emitter)
        console.log(`clonning ${emitter_id}:(${clone.id}) to ${element.id}`)
        element.appendChild(clone)
    } else {
        console.log(`moving ${emitter_id} to ${html.get_id(element)}`)
        element.appendChild(emitter)
    }
}
