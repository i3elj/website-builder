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
        const clone = create_clone_from_emmitter(emitter)
        drop_root.appendChild(clone)
    } else {
        console.log(`moving ${get_id(emitter)} to root`)
        drop_root.appendChild(emitter)
    }
}

function create_clone_from_emmitter(element)
{
    const tag_name = element.classList[0].split('__')[0]
    const clone = document.createElement(tag_name)
    clone.classList.add('__item')
    clone.classList.add('__droppable')
    clone.setAttribute('draggable', true)
    html.add_id(clone, html.create_unique_id())

    switch (html.get_tag_name(clone)) {
        case 'p':
            clone.innerHTML = 'Insert Text'
            clone.onblur = e => clone.setAttribute('contenteditable', false)
            clone.ondblclick = e => {
                clone.setAttribute('contenteditable', true)
                clone.focus()
                window.getSelection().selectAllChildren(clone)
            }
            setTimeout(() => {
                clone.setAttribute('contenteditable', true)
                clone.focus()
                window.getSelection().selectAllChildren(clone)
            }, 100)
            break;

        case 'textarea':
            clone.style.resize = 'both'
            clone.removeAttribute('disabled')
            break;
    }

    return clone
}
