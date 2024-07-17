function dragStart(event) {
    console.log('configuring drag start')
    event.dataTransfer.clearData()
    event.dataTransfer.setData('text/plain', event.target.dataset.id)
}

function dragEnter(event) {
    event.preventDefault()
    event.target.classList.add('__item-hovered')
}

function dragLeave(event) {
    event.preventDefault()
    event.target.classList.remove('__item-hovered')
}

function dragOver(event) {
    event.preventDefault()
}

function dragDrop(event) {
    const element = event.target
    event.stopPropagation()
    event.target.classList.remove('__item-hovered')
    const emitter_id = event.dataTransfer.getData('text/plain')
    const emitter = find(`[data-id="${emitter_id}"]`)

    if (OGLIST.includes(emitter_id)) {
        const clone = html_clone(emitter)
        console.log(`clonning ${emitter_id}:(${clone.id}) to ${element.dataset.id}`)
        element.appendChild(clone)
    } else {
        console.log(`moving ${emitter_id} to ${element.dataset.id}`)
        element.appendChild(emitter)
    }
}
