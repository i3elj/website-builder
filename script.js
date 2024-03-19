const og_elems_id_list = Array.from(htmx.findAll('.__og-drag'))
                                 .map(e => e.id)

const body_observer = new MutationObserver(() => {
    htmx.findAll('.__droppable').forEach(element => {
        element.ondragstart = event => {
            console.log('configuring drag start')
            event.dataTransfer.clearData()
            event.dataTransfer.setData('text/plain', event.target.id)
        }
        element.ondragenter = event => {
            event.preventDefault()
            event.target.classList.add('__item-hovered')
        }
        element.ondragleave = event => {
            event.preventDefault()
            event.target.classList.remove('__item-hovered')
        }
        element.ondragover = event => event.preventDefault()
        element.ondrop = event => {
            event.stopPropagation()
            event.target.classList.remove('__item-hovered')
            console.log('starting drop event')
            const emitter_id = event.dataTransfer.getData('text/plain')
            console.log(emitter_id)
            const emitter = htmx.find('#' + emitter_id)

            if (og_elems_id_list.includes(emitter_id)) {
                const clone = create_clone_from_emmitter(emitter)
                console.log(`clonning ${emitter_id}:(${clone.id}) to ${element.id}`)
                element.appendChild(clone)
            } else {
                console.log(`moving ${emitter_id} to ${element.id}`)
                element.appendChild(emitter)
            }
        }
    })
})

const drop_root = htmx.find('#__tg-body')
body_observer.observe(htmx.find('body'), {
    subtree: true,
    childList: true,
})

// configuration of every original draggable element
htmx.findAll('.__og-drag').forEach(og_drag => {
    og_drag.ondragstart = event => {
        console.log('configuring ROOT drag start')
        event.dataTransfer.clearData()
        event.dataTransfer.setData('text/plain', og_drag.id)
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
    const emitter = htmx.find('#' + emitter_id)

    if (og_elems_id_list.includes(emitter_id)) {
        const clone = create_clone_from_emmitter(emitter)
        drop_root.appendChild(clone)
    } else {
        console.log('moving element to root')
        drop_root.appendChild(emitter)
    }
}

function create_clone_from_emmitter(element)
{
    const tag_name = element.id.split('__')[0]
    const clone = document.createElement(tag_name)
    clone.classList.add('__item')
    clone.classList.add('__droppable')
    clone.setAttribute('draggable', true)
    clone.id = create_unique_id()

    switch (clone.tagName.toLowerCase()) {
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

function create_unique_id()
{
    const id_list = Array.from(htmx.findAll('.__item'))
                         .map(e => e.id.split('-')[1])

    if (id_list.length == 0)
        return '__item-1'

    return '__item-' + (Math.max(...id_list) + 1)
}
