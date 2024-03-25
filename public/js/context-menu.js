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
	htmx.find('#__ctx-menu_tag').innerText = html.get_tag_name(event.target)

	const [
		delete_btn,
		html_btn,
		styles_btn
	] = Array.from(menu.children).filter(e => e.tagName.toLowerCase() == 'button')

	delete_btn.onclick = () => {
		const id = html.get_id(event.target)
		htmx.find('.' + id).remove()
		deactivateMenu()
	}
	html_btn.onclick = () => {
		const id = html.get_id(event.target)
		const element = htmx.find('.' + id)
		editors.html(element)
		deactivateMenu()
	}
	styles_btn.onclick = function(event) {}
}

function deactivateMenu()
{
	menu_wrapper.style.display = 'none'
}
