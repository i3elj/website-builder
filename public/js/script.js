import './global.js'
import * as drag from './drag.js'
import * as html from './html_manipulation.js'
import { context_menu } from './context-menu.js'
import * as editors from './editors.js'

const body_observer = new MutationObserver((records, observer) => {
    const addedNode = records[0].addedNodes[0] ?? null

    if (addedNode != null) {
        addedNode.ondragstart    = drag.start
        addedNode.ondragenter    = drag.enter
        addedNode.ondragleave    = drag.leave
        addedNode.ondragover     = drag.over
        addedNode.ondrop         = drag.drop
        addedNode.oncontextmenu = context_menu
    }
})

var spacer_active = 1;
window.onkeydown = function(event) {
    const items = Array.from(htmx.findAll('.__item'))
    if (event.code == 'CapsLock') {
        if (spacer_active) {
            items.forEach(i => i.classList.remove('__spacer'))
            spacer_active = 0
        } else {
            items.forEach(i => i.classList.add('__spacer'))
            spacer_active = 1
        }
    }
}

const drop_root = htmx.find('#__tg-body body')
body_observer.observe(htmx.find('body'), {subtree: true, childList: true,})

// configuration of every original draggable element
htmx.findAll('.__og-drag').forEach(og_drag => {
    og_drag.ondragstart = event => {
        console.log('configuring ROOT drag start')
        event.dataTransfer.clearData()
        event.dataTransfer.setData('text/plain', og_drag.dataset.id)
    }
})

//root's configuration
drop_root.ondragenter = e => {
    e.preventDefault()
    event.target.classList.add('__item-hovered')
}
drop_root.ondragover = e => e.preventDefault()
drop_root.ondragleave = e => {
    e.preventDefault()
    event.target.classList.remove('__item-hovered')
}
drop_root.ondrop = event => {
    console.log('ROOT drop event')
    event.target.classList.remove('__item-hovered')

    const emitter_id = event.dataTransfer.getData('text/plain')
    const emitter = htmx.find(`[data-id="${emitter_id}"]`)

    if (OGLIST.includes(emitter_id)) {
        const clone = html.clone(emitter)
        drop_root.appendChild(clone)
    } else {
        console.log(`moving ${emitter.dataset.id} to root`)
        drop_root.appendChild(emitter)
    }
}
