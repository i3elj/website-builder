import * as html from './html_manipulation.js'

const menu_wrapper = htmx.find('#__ctx-menu-wrapper')
const menu = htmx.find('#__ctx-menu')

menu_wrapper.onmousedown = function(event) {
    if (event.target == this)
        deactivateMenu()
}

export function contextmenu(event)
{
    event.preventDefault()

    var x = event.pageX
    var y = event.pageY

    menu.style.top = `${y + 8}px`
    menu.style.left = `${x + 32}px`

    activateMenu()
}

function activateMenu()
{
    menu_wrapper.style.opacity = 1
    menu_wrapper.style.zIndex = 2
    const ctx_menu_tag = htmx.find('#__ctx-menu_tag')
    ctx_menu_tag.innerText = html.get_tag_name(event.target)
}

function deactivateMenu() {
    menu_wrapper.style.opacity = 0
    menu_wrapper.style.zIndex = -1
}
