import './global.js'
import * as drag from './drag.js'
import * as html from './html_manipulation.js'
import { contextmenu } from './context-menu.js'

const body_observer = new MutationObserver(() => {
    htmx.findAll('.__droppable').forEach(element => {
        element.ondragstart = drag.start
        element.ondragenter = drag.enter
        element.ondragleave = drag.leave
        element.ondragover  = drag.over
        element.ondrop      = drag.drop
        element.oncontextmenu = contextmenu
    })
})

const drop_root = htmx.find('#__tg-body')
body_observer.observe(htmx.find('body'), {subtree: true, childList: true,})

// configuration of every original draggable element
htmx.findAll('.__og-drag').forEach(og_drag => {
    og_drag.ondragstart = event => {
        console.log('configuring ROOT drag start')
        event.dataTransfer.clearData()
        event.dataTransfer.setData('text/plain', html.get_id(og_drag))
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
    const emitter = htmx.find('.' + emitter_id)

    if (OGLIST.includes(emitter_id)) {
        const clone = html.clone(emitter)
        drop_root.appendChild(clone)
    } else {
        console.log(`moving ${get_id(emitter)} to root`)
        drop_root.appendChild(emitter)
    }
}