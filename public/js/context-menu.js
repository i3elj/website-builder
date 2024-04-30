import * as html from './html_manipulation.js'
import * as editors from './editors.js'

const ctxm_wrapper = htmx.find('#__ctx-menu-wrapper');
const ctxm_menu = htmx.find('#__ctx-menu');
const ctxm_tag = htmx.find('#__ctx-menu_tag');

ctxm_wrapper.onmousedown = function(e) {
    if (e.target == this) deactivate_menu()
}

export function context_menu(event)
{
    event.preventDefault()

    const m_width = ctxm_menu.offsetWidth
    const m_height = ctxm_menu.offsetHeight

    const c_x = event.pageX
    const c_y = event.pageY

    var left = c_x + m_width >= window.innerWidth
             ? c_x - m_width : c_x

    var top = c_y + m_height >= window.innerHeight
            ? c_y - m_height : c_y

    ctxm_menu.style.left = `${left}px`
    ctxm_menu.style.top = `${top}px`

    activate_menu(event)
}

function activate_menu(event)
{
    ctxm_wrapper.style.display = 'flex';

    ctxm_tag.innerText = html.get_tag_name(event.target)
                       + (event.target.id != "" ? ` #${event.target.id}` : '')
                       + (' ' + Array.from(event.target.classList)
                                     .filter(c => !c.startsWith('__'))
                                     .map(c => `.${c}`)
                                     .join(' '));

    const [
        btn_delete,
        btn_html,
        btn_styles,
        btn_add_class,
    ] = Array.from(ctxm_menu.children)
             .filter(e => e.tagName.toLowerCase() == 'button')

    btn_delete.onclick = () => {
        const id = event.target.dataset.id
        htmx.find(`[data-id="${id}"]`).remove()
        deactivate_menu()
    }

    btn_html.onclick = () => {
        const id = event.target.dataset.id
        const element = htmx.find(`[data-id="${id}"`)
        editors.html(element)
        deactivate_menu()
    }

    btn_styles.onclick = () => {
        const id = event.target.dataset.id
        const element = htmx.find(`[data-id="${id}"`)
        editors.css(element)
        deactivate_menu()
    }

    btn_add_class.onclick = () => {
        const wrapper = htmx.find('#__add-class-wrapper')
        wrapper.style.display = 'flex'
        wrapper.onmousedown = function(event) {
            if (event.target == this) wrapper.style.display = 'none'
        }

        const form = htmx.find('#__add-class-wrapper form')
        form.onsubmit = (e) => {
            e.preventDefault()

            if (!event.target.classList.contains(input.value)) {
                event.target.classList.add(input.value)

                if (htmx.find(`style.${input.value}`) == null) {
                    console.log('creating css button')
                    const customStyleTag = document.createElement('style')
                    customStyleTag.classList.add(input.value)
                    document.body.prepend(customStyleTag)
                }
            }

            if (htmx.find(`button[data-id='${input.value}']`) == null) {
                const editClassStyleBtn = document.createElement('button')
                editClassStyleBtn.classList.add('__class-btn')
                editClassStyleBtn.dataset.id = input.value
                editClassStyleBtn.textContent = '.' + input.value
                editClassStyleBtn.onclick = (event) => {
                    editors.cssClass(
                        htmx.find('style' + event.target.textContent),
                        event.target.textContent
                    )
                }
                htmx.find('#__class-list').prepend(editClassStyleBtn)
            }

            deactivate_menu()
            wrapper.style.display = 'none'
        }

        const input = htmx.find('#__add-class-wrapper input')
        input.focus()

        deactivate_menu()
    }
}

function deactivate_menu()
{
    ctxm_wrapper.style.display = 'none'
}
