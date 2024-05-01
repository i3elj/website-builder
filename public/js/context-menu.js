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

    const id = event.target.dataset.id
    btn_delete.onclick    = () => html.deleteElement(id)
    btn_html.onclick      = () => html.editHtml(id)
    btn_styles.onclick    = () => html.editStyles(id)
    btn_add_class.onclick = () => html.addClass(event.target)
}

export function deactivate_menu()
{
    ctxm_wrapper.style.display = 'none'
}
