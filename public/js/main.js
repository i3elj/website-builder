const bodyObserver = new MutationObserver((records, observer) => {
    const addedNode = records[0].addedNodes[0] ?? null

    if (addedNode != null) {
        addedNode.ondragstart   = dragStart
        addedNode.ondragenter   = dragEnter
        addedNode.ondragleave   = dragLeave
        addedNode.ondragover    = dragOver
        addedNode.ondrop        = dragDrop
        addedNode.oncontextmenu = openContextMenu
    }
})

var spacerActive = 1
window.onkeydown = function(event) {
    const items = Array.from(elements('.__item'))
    if (event.code == 'CapsLock') {
        if (spacerActive) {
            items.forEach(i => i.classList.remove('__spacer'))
            spacerActive = 0
        } else {
            items.forEach(i => i.classList.add('__spacer'))
            spacerActive = 1
        }
    }
}

const dropRoot = element('#__tg-body')
bodyObserver.observe(element('body'), {
    subtree: true, childList: true
})

// configuration of every original draggable element
elements('.__og-drag').forEach(og_drag => {
    og_drag.ondragstart = event => {
        console.log('configuring ROOT drag start')
        event.dataTransfer.clearData()
        event.dataTransfer.setData('text/plain', og_drag.dataset.id)
    }
})

//root's configuration
dropRoot.ondragenter = e => {
    e.preventDefault()
    event.target.classList.add('__item-hovered')
}
dropRoot.ondragover = e => e.preventDefault()
dropRoot.ondragleave = e => {
    e.preventDefault()
    event.target.classList.remove('__item-hovered')
}
dropRoot.ondrop = event => {
    console.log('ROOT drop event')
    event.target.classList.remove('__item-hovered')

    const emitter_id = event.dataTransfer.getData('text/plain')
    const emitter = element(`[data-id="${emitter_id}"]`)

    if (OGLIST.includes(emitter_id)) {
        const clone = html_clone(emitter)
        dropRoot.appendChild(clone)
    } else {
        console.log(`moving ${emitter.dataset.id} to root`)
        dropRoot.appendChild(emitter)
    }
}
