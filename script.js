const original_container = htmx.find('.original-container')
const original_item = htmx.find('#original-item')

const id_list_og_elems = Array.from(htmx.findAll('.__og-drag'))
                              .map(elem => elem.id)

htmx.findAll('.__og-drag').forEach(elem => {
    htmx.on(elem, 'dragstart', event => {
        console.log('drag started')
        event.dataTransfer.clearData()
        const id = elem.nodeName.toLowerCase() + '__og-drag'
        event.dataTransfer.setData('text/plain', id)
    })
})

htmx.findAll('.__droppable').forEach(elem => {
    htmx.on(elem, 'dragenter', e => e.preventDefault())
    htmx.on(elem, 'dragover', e => e.preventDefault())

    htmx.on(elem, 'drop', event => {
        const id = event.dataTransfer.getData('text/plain')

        if (id_list_og_elems.includes(id)) {
            const clone = htmx.find(`#${id}`).cloneNode(true)
            clone.classList.add('item')
            clone.classList.remove('__og-drag')
            clone.id = create_unique_id()

            htmx.on(clone, 'dragstart', event => {
                console.log('cloned item - drag started')
                event.dataTransfer.clearData()
                event.dataTransfer.setData('text/plain', clone.id)
            })

            elem.appendChild(clone)
        } else {
            elem.appendChild(htmx.find(`#${id}`))
        }
    })
})

/* htmx.findAll('.container').forEach(container => {
 *     htmx.on(container, 'dragenter', e => e.preventDefault())
 *     htmx.on(container, 'dragover', e => e.preventDefault())
 *
 *     htmx.on(container, 'drop', event => {
 *         const id = event.dataTransfer.getData('text/plain')
 *
 *         if (id == original_item.id) {
 *             const clone = original_item.cloneNode(true)
 *             clone.classList.add('item')
 *             clone.id = create_unique_id()
 *
 *             htmx.on(clone, 'dragstart', event => {
 *                 console.log('cloned item - drag started')
 *                 event.dataTransfer.clearData()
 *                 event.dataTransfer.setData('text/plain', clone.id)
 *             })
 *
 *             container.appendChild(clone)
 *         } else {
 *             const item = htmx.find(`#${id}`)
 *             container.appendChild(item)
 *         }
 *     })
 * }) */

function create_unique_id()
{
    const list = Array.from(htmx.findAll('.item'))
                      .map(item => Number(item.id.split('-')[1]))

    if (list.length == 0) {
        return '__item-1'
    }

    return '__item-' + (Math.max(...list) + 1)
}
