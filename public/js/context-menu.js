import * as html from './html_manipulation.js'
import * as editors from './editors.js'

const menu_wrapper = htmx.find('#__ctx-menu-wrapper')
const menu = htmx.find('#__ctx-menu')

menu_wrapper.onmousedown = function(event) {
    if (event.target == this) {
        deactivateMenu()
    }
}

export function contextmenu(event)
{
    event.preventDefault()

    const placement = {v: 0, h: 0}

    const m_width = menu.offsetWidth // 1920
    const m_height = menu.offsetHeight // 1080

    const c_x = event.pageX
    const c_y = event.pageY

    var left = c_x + m_width >= window.innerWidth ? c_x - m_width : c_x
    var top = c_y + m_height >= window.innerHeight ? c_y - m_height : c_y

    menu.style.left = `${left}px`
    menu.style.top = `${top}px`

    activateMenu(event)
}

function activateMenu(event)
{
    menu_wrapper.style.display = 'flex';

    htmx.find('#__ctx-menu_tag').innerText = html.get_tag_name(event.target) + (
        event.target.id != "" ? ` #${event.target.id}` : ''
    )

    const [ delete_btn
          , html_btn
          , styles_btn
          , add_id_btn
          , add_class_btn
    ] = Array.from(menu.children)
             .filter(e => e.tagName.toLowerCase() == 'button')

    delete_btn.onclick = () => {
        const id = event.target.dataset.id
        htmx.find(`[data-id="${id}"]`).remove()
        deactivateMenu()
    }

    html_btn.onclick = () => {
        const id = event.target.dataset.id
        const element = htmx.find(`[data-id="${id}"`)
        editors.html(element)
        deactivateMenu()
    }

    styles_btn.onclick = () => {
        const id = event.target.dataset.id
        const element = htmx.find(`[data-id="${id}"`)
        const classlist = Array.from(element.classList)
                               .filter(c => !c.startsWith('__'))

        if (classlist.length == 0 && element.id == "") {
            // replace this with a custom pop-up system
            alert("You should add a css class before styling this element")
            return
        }

        editors.css(element)
        deactivateMenu()
    }

    add_id_btn.onclick = () => {
        const wrapper = htmx.find('#__add-id-wrapper')
        wrapper.style.display = 'flex'
        wrapper.onmousedown = function(event) {
            if (event.target == this)
                wrapper.style.display = 'none'
        }

        const form = htmx.find('#__add-id-wrapper form')
        form.onsubmit = (e) => {
            e.preventDefault()
            event.target.id = input.value
            deactivateMenu()
            wrapper.style.display = 'none'
        }

        const input = htmx.find('#__add-id-wrapper input')
        input.value = event.target.id
        input.focus()

        deactivateMenu()
    }

    add_class_btn.onclick = () => {
        const wrapper = htmx.find('#__add-class-wrapper')
        wrapper.style.display = 'flex'
        wrapper.onmousedown = function(event) {
            if (event.target == this) {
                wrapper.style.display = 'none'
            }
        }

        const form = htmx.find('#__add-class-wrapper form')
        form.onsubmit = (e) => {
            e.preventDefault()
            event.target.classList.add(input.value)
            deactivateMenu()
            wrapper.style.display = 'none'
        }

        const input = htmx.find('#__add-class-wrapper input')
        input.focus()

        deactivateMenu()
    }
}

function deactivateMenu()
{
    menu_wrapper.style.display = 'none'
}
